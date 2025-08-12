#!/usr/bin/env node
import fs from 'fs';
import { execSync } from 'child_process';

function readLogs() {
  const dir = 'logs';
  if (!fs.existsSync(dir)) return '';
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.log'))
    .map(f => {
      const content = fs.readFileSync(`${dir}/${f}`);
      const max = 2 * 1024 * 1024; // 2MB
      const slice = content.length > max ? content.slice(-max) : content;
      return `File: ${f}\n\n${slice.toString('utf8')}`;
    })
    .join('\n\n');
}

async function run() {
  const apiKey = process.env.OPENAI_API_KEY;
  const ghToken = process.env.GITHUB_TOKEN;
  if (!apiKey) throw new Error('OPENAI_API_KEY missing');
  if (!ghToken) throw new Error('GITHUB_TOKEN missing');

  const logs = readLogs();
  const prompt = `The following CI logs show errors. Provide a unified git diff patch fixing the issue. Only output the patch.\n\n${logs}`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0
    })
  });
  const json = await res.json();
  if (json.error) {
    console.error('OpenAI API error:', json.error.message || json.error);
    const msg = json.error.message?.toLowerCase() || '';
    if (msg.includes('billing')) {
      console.error('Ensure your OpenAI account has an active billing plan.');
    }
    if (msg.includes('invalid api key') || msg.includes('incorrect api key')) {
      console.error('Check that your OPENAI_API_KEY is valid and has access to the requested model.');
    }
    process.exit(1);
  }
  const patch = json.choices?.[0]?.message?.content;
  if (!patch) {
    console.error('No patch produced', json);
    process.exit(1);
  }
  fs.writeFileSync('patch.diff', patch);
  execSync('git apply patch.diff');

  try {
    execSync('npm run lint --prefix frontend', { stdio: 'inherit' });
    execSync('npm test --prefix frontend', { stdio: 'inherit' });
  } catch (err) {
    console.error('Lint or tests failed', err);
    process.exit(1);
  }

  const summary = logs.split('\n').slice(-20).join('\n');
  const slug = summary.split('\n')[0].slice(0, 20).replace(/[^a-zA-Z0-9]+/g, '-');
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const branch = `codex-fix/${slug}-${ts}`;

  execSync('git config user.name "github-actions[bot]"');
  execSync('git config user.email "github-actions[bot]@users.noreply.github.com"');
  execSync(`git checkout -b ${branch}`);
  execSync('git add -A');
  execSync('git commit -m "chore: auto-fix failing build"');
  execSync(`git push origin ${branch}`);

  const repo = process.env.GITHUB_REPOSITORY;
  const [owner, repoName] = repo.split('/');
  const prTitle = 'chore: auto fix for failing build';
  const prBody = `Automated fix for failing CI.\n\n<details><summary>CI logs</summary>\n\n\`\`\`\n${summary}\n\`\`\`\n\n</details>`;
  const prRes = await fetch(`https://api.github.com/repos/${owner}/${repoName}/pulls`, {
    method: 'POST',
    headers: {
      'Authorization': `token ${ghToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: prTitle,
      head: branch,
      base: process.env.GITHUB_REF_NAME || 'master',
      body: prBody
    })
  });
  const prJson = await prRes.json();
  if (!prRes.ok) {
    console.error('Failed to create PR', prJson);
    process.exit(1);
  }
  const prNumber = prJson.number;
  await fetch(`https://api.github.com/repos/${owner}/${repoName}/issues/${prNumber}/labels`, {
    method: 'POST',
    headers: {
      'Authorization': `token ${ghToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ labels: ['codex-auto-fix'] })
  });
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
