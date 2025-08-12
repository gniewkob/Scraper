# GitHub Agent Scripts

This directory contains helper utilities used by CI automation.

## ci-self-heal.js

`ci-self-heal.js` reads build logs and tries to generate a patch fixing failing CI runs. It uses both the OpenAI API and GitHub API, so two environment variables must be provided before running:

- `OPENAI_API_KEY` – API key for the OpenAI API
- `GITHUB_TOKEN` – Personal access token with repository permissions

### Running locally

To execute the script manually, export the required variables and run the file with Node.js:

```bash
export OPENAI_API_KEY="sk-your-key"
export GITHUB_TOKEN="ghp_your_token"
node .github/agent/ci-self-heal.js
```

The script will apply the generated patch and push a branch with a pull request.
