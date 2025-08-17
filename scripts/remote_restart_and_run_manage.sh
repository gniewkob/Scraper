#!/usr/bin/env bash
# Open local SSH tunnel (if needed) and SSH to remote host to run manage.sh
# Remote repo location default: /usr/home/vetternkraft/apps/python/scraper_workspace
# Usage examples:
#  ./scripts/remote_restart_and_run_manage.sh
#  DB_URL='postgresql+asyncpg://user:pass@localhost:8543/db' \
#    ./scripts/remote_restart_and_run_manage.sh --ssh-target vetternkraft@s0.mydevil.net

set -euo pipefail

DEFAULT_SSH_TUNNEL_CMD="ssh -f vetternkraft@s0.mydevil.net -L 8543:pgsql0.mydevil.net:5432 -N"
DEFAULT_SSH_TARGET="vetternkraft@s0.mydevil.net"
REMOTE_DIR="/usr/home/vetternkraft/apps/python/scraper_workspace"
LOCAL_DB_PORT=8543
BACKEND_PORT=${BACKEND_PORT:-38273}
FRONTEND_PORT=${FRONTEND_PORT:-61973}

show_help() {
  cat <<EOF
Usage: $0 [--ssh-tunnel '<ssh tunnel cmd>'] [--ssh-target '<user@host>'] [--remote-dir '<path>'] [--db-url '<DB_URL>']

This script will:
  - ensure a local SSH tunnel is listening on localhost:${LOCAL_DB_PORT} (unless already running)
  - copy DB_URL to the remote host securely (via base64) and export it for the remote manage.sh
  - run remote ./manage.sh restart backend and restart frontend

Options:
  --ssh-tunnel   Override default tunnel command (default: ${DEFAULT_SSH_TUNNEL_CMD})
  --ssh-target   SSH target for remote command execution (default: ${DEFAULT_SSH_TARGET})
  --remote-dir   Remote repository path holding manage.sh (default: ${REMOTE_DIR})
  --db-url       Override DB URL (if not provided, reads DB_URL env or prompts)
  -h, --help     Show this message

Examples:
  # default behavior (prompts for DB_URL if missing):
  ./scripts/remote_restart_and_run_manage.sh

  # provide DB_URL and custom ssh tunnel:
  DB_URL='postgresql+asyncpg://user:pa$$@localhost:8543/db' \
    ./scripts/remote_restart_and_run_manage.sh --ssh-tunnel "ssh -f user@host -L 8543:remote:5432 -N"

EOF
}

# parse args
SSH_TUNNEL_CMD="${SSH_TUNNEL_CMD:-$DEFAULT_SSH_TUNNEL_CMD}"
SSH_TARGET="${SSH_TARGET:-$DEFAULT_SSH_TARGET}"
USER_DB_URL=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --ssh-tunnel)
      SSH_TUNNEL_CMD="$2"; shift 2;;
    --ssh-target)
      SSH_TARGET="$2"; shift 2;;
    --remote-dir)
      REMOTE_DIR="$2"; shift 2;;
    --db-url)
      USER_DB_URL="$2"; shift 2;;
    -h|--help)
      show_help; exit 0;;
    *)
      echo "Unknown arg: $1"; show_help; exit 2;;
  esac
done

# Check required commands
for cmd in ssh curl lsof base64; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "Required command '$cmd' not found in PATH. Install it and retry." >&2
    exit 1
  fi
done

# Determine DB_URL
if [[ -n "${USER_DB_URL}" ]]; then
  DB_URL="$USER_DB_URL"
elif [[ -n "${DB_URL:-}" ]]; then
  DB_URL="$DB_URL"
else
  read -r -p "Enter DB_URL (example: postgresql+asyncpg://user:pass@localhost:${LOCAL_DB_PORT}/dbname): " DB_URL
fi

if [[ -z "$DB_URL" ]]; then
  echo "DB_URL is empty. Aborting." >&2
  exit 2
fi

# Start SSH tunnel locally if needed
if lsof -iTCP:"${LOCAL_DB_PORT}" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Local port ${LOCAL_DB_PORT} is listening; assuming tunnel already running."
else
  echo "Starting local SSH tunnel: $SSH_TUNNEL_CMD"
  # shellcheck disable=SC2086
  eval $SSH_TUNNEL_CMD
  sleep 0.5
  if lsof -iTCP:"${LOCAL_DB_PORT}" -sTCP:LISTEN >/dev/null 2>&1; then
    echo "SSH tunnel started and listening on localhost:${LOCAL_DB_PORT}"
  else
    echo "Failed to start SSH tunnel or port ${LOCAL_DB_PORT} not listening." >&2
    exit 3
  fi
fi

# Prepare base64 payload of DB_URL to avoid quoting problems
BASE64_DB_URL=$(printf '%s' "$DB_URL" | base64)
REMOTE_TMP_FILE="/tmp/scraper_db_url_$$"

# Build remote command script (here-doc will be executed on remote)
read -r -d '' REMOTE_SCRIPT <<'RS'
set -euo pipefail
TMP_FILE='__REMOTE_TMP__'
REPO_DIR='__REMOTE_DIR__'
if [[ ! -d "$REPO_DIR" ]]; then
  echo "Remote repo dir does not exist: $REPO_DIR" >&2
  exit 4
fi
# decode payload into tmp file
cat > "$TMP_FILE" <<'B64'
__BASE64__
B64
base64 -d "$TMP_FILE" > "${TMP_FILE}.decoded"
DB_URL=$(cat "${TMP_FILE}.decoded")
export DB_URL DATABASE_URL="$DB_URL"
cd "$REPO_DIR"
if [[ ! -x ./manage.sh ]]; then
  echo "manage.sh not found or not executable in $REPO_DIR" >&2
  exit 5
fi
# Restart backend
./manage.sh restart backend
# Ensure backend health before restarting frontend
HEALTH_URL="http://127.0.0.1:__BACKEND_PORT__/health"
for i in {1..30}; do
  if curl -sfS --max-time 2 "$HEALTH_URL" >/dev/null 2>&1; then
    echo "Remote backend healthy"
    break
  fi
  sleep 1
  if [[ $i -eq 30 ]]; then
    echo "Remote backend did not become healthy within timeout." >&2
    exit 6
  fi
done
# Set frontend env var and restart frontend
export NEXT_PUBLIC_API_URL="http://127.0.0.1:__BACKEND_PORT__/api"
./manage.sh restart frontend
# cleanup
rm -f "$TMP_FILE" "${TMP_FILE}.decoded"
RS

# Replace placeholders
REMOTE_SCRIPT=${REMOTE_SCRIPT//__BASE64__/${BASE64_DB_URL}}
REMOTE_SCRIPT=${REMOTE_SCRIPT//__REMOTE_DIR__/${REMOTE_DIR}}
REMOTE_SCRIPT=${REMOTE_SCRIPT//__REMOTE_TMP__/${REMOTE_TMP_FILE}}
REMOTE_SCRIPT=${REMOTE_SCRIPT//__BACKEND_PORT__/${BACKEND_PORT}}

# Execute remote script via ssh
echo "Running remote manage.sh on $SSH_TARGET (repo: $REMOTE_DIR)"
ssh "$SSH_TARGET" /bin/bash -s <<'SSHIN'
$REMOTE_SCRIPT
SSHIN

echo "Remote restart complete. Frontend should be available at http://127.0.0.1:${FRONTEND_PORT} on the REMOTE host (or via your proxy)."

# end
