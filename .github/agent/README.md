# CI Self-Healing Agent

This directory contains a script used to automatically fix failing CI builds by generating patches with OpenAI's API and opening a pull request with the changes.

## Requirements
- Node.js
- `OPENAI_API_KEY` environment variable with access to the [OpenAI API](https://platform.openai.com/docs/api-reference/introduction).
- `GITHUB_TOKEN` environment variable with permission to push branches and create pull requests.

### Billing
An OpenAI account with **active billing** is required for the script to run. If billing is not active, API calls will fail with a `billing_not_active` error. See the [OpenAI billing documentation](https://platform.openai.com/docs/guides/billing) for more details.

## Usage
Run the agent from the repository root:

```bash
node .github/agent/ci-self-heal.js
```

The script reads CI logs from the `logs` directory, generates a patch, applies it, runs tests, and opens a pull request with the fix.
