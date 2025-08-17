#!/usr/bin/env bash
# helpers to open an SSH tunnel to the remote Postgres, export DB env vars,
# restart backend/frontend using ./manage.sh and verify basic health endpoints.
# Usage:
#   ./scripts/connect_and_restart.sh          # interactive prompt for DB_URL or uses DB_URL env
#   DB_URL='postgresql+asyncpg://user:pass@localhost:8543/db' \
#     ./scripts/connect_and_restart.sh --ssh 'ssh -f user@host -L 8543:remote:5432 -N'

set -euo pipefail

# Defaults (from repo conventions)
DEFAULT_SSH_CMD="ssh -f vetternkraft@s0.mydevil.net -L 8543:pgsql0.mydevil.net:5432 -N"
LOCAL_DB_PORT=8543
BACKEND_PORT=${BACKEND_PORT:-38273}
FRONTEND_PORT=${FRONTEND_PORT:-61973}
MANAGE_SH="$(cd "$(dirname "$0")/.." && pwd)/manage.sh"

show_help() {
  cat <<EOF
Usage: $0 [--ssh '<ssh command>'] [--db-url '<DB_URL>']

This script will:
  - ensure an SSH tunnel to the remote Postgres is running (on localhost:${LOCAL_DB_PORT})
  - set DB env (DB_URL and DATABASE_URL) in the current shell and export for the restart
  - restart backend and frontend via ./manage.sh
  - wait for backend /health, then check /api/products

Options:
  --ssh     Override the default SSH tunnel command (default: ${DEFAULT_SSH_CMD})
  --db-url  Override DB URL. If not provided, the script will use DB_URL env or prompt you.
  -h|--help  Show this message

Examples:
  # interactive (prompt for DB password if DB_URL missing):
  ./scripts/connect_and_restart.sh

  # use provided ssh command and DB url (careful with quoting):
  DB_URL='postgresql+asyncpg://user:pa$$word@localhost:8543/dbname' \
    ./scripts/connect_and_restart.sh --ssh "ssh -f user@host -L 8543:remote:5432 -N"

EOF
}

# parse args
SSH_CMD="${SSH_CMD:-$DEFAULT_SSH_CMD}"
USER_DB_URL=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --ssh)
      SSH_CMD="$2"; shift 2;;
    --db-url)
      USER_DB_URL="$2"; shift 2;;
    -h|--help)
      show_help; exit 0;;
    *)
      echo "Unknown arg: $1"; show_help; exit 2;;
  esac
done

# Check for required utilities
for cmd in ssh curl lsof; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "Required command '$cmd' not found in PATH. Install it and retry." >&2
    exit 1
  fi
done

# Ensure manage.sh exists and is executable
if [[ ! -x "$MANAGE_SH" ]]; then
  echo "manage.sh not found or not executable at: $MANAGE_SH" >&2
  echo "Make sure you're running this script from the repository root or adjust MANAGE_SH." >&2
  exit 1
fi

# Determine DB_URL
if [[ -n "${USER_DB_URL}" ]]; then
  DB_URL="$USER_DB_URL"
elif [[ -n "${DB_URL:-}" ]]; then
  DB_URL="$DB_URL"
else
  echo "Enter DB_URL (example: postgresql+asyncpg://user:pass@localhost:${LOCAL_DB_PORT}/dbname)"
  read -r -p "DB_URL: " DB_URL
fi

if [[ -z "$DB_URL" ]]; then
  echo "DB_URL is empty. Aborting." >&2
  exit 2
fi

# Start SSH tunnel if local port not in use
if lsof -iTCP:"${LOCAL_DB_PORT}" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Local port ${LOCAL_DB_PORT} appears to be in use; assuming tunnel is already running."
else
  echo "Starting SSH tunnel: $SSH_CMD"
  # shellcheck disable=SC2086
  eval $SSH_CMD
  sleep 0.5
  if lsof -iTCP:"${LOCAL_DB_PORT}" -sTCP:LISTEN >/dev/null 2>&1; then
    echo "SSH tunnel started and is listening on localhost:${LOCAL_DB_PORT}"
  else
    echo "Failed to start ssh tunnel or port ${LOCAL_DB_PORT} not listening." >&2
    exit 3
  fi
fi

# Export DB env vars for manage.sh (exporting in this shell won't persist after the script exits,
# but manage.sh will inherit these variables when invoked by this script)
export DB_URL
export DATABASE_URL="$DB_URL"

echo "Exported DB_URL and DATABASE_URL (masked in output):"
echo "  DB_URL=${DB_URL:0:12}...(redacted)"

# Restart backend
echo "Restarting backend via $MANAGE_SH"
"$MANAGE_SH" restart backend

# Wait for backend /health
HEALTH_URL="http://127.0.0.1:${BACKEND_PORT}/health"
echo "Waiting for backend health at $HEALTH_URL"
for i in {1..30}; do
  if curl -sfS --max-time 2 "$HEALTH_URL" >/dev/null 2>&1; then
    echo "Backend healthy"
    break
  fi
  sleep 1
  if [[ $i -eq 30 ]]; then
    echo "Backend did not become healthy within timeout." >&2
    echo "See backend logs: $MANAGE_SH logs backend 200" >&2
    exit 4
  fi
done

# Ensure frontend points to the backend API
if [[ -z "${NEXT_PUBLIC_API_URL:-}" ]]; then
  export NEXT_PUBLIC_API_URL="http://127.0.0.1:${BACKEND_PORT}/api"
  echo "Exported NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL"
else
  echo "Using NEXT_PUBLIC_API_URL from environment: $NEXT_PUBLIC_API_URL"
fi

# Restart frontend
echo "Restarting frontend via $MANAGE_SH"
"$MANAGE_SH" restart frontend

# Quick sanity checks
PRODUCTS_URL="${NEXT_PUBLIC_API_URL%/}/products"
echo "Checking products endpoint: $PRODUCTS_URL"
if curl -fsS --max-time 5 "$PRODUCTS_URL" >/dev/null 2>&1; then
  echo "Products endpoint reachable"
else
  echo "Products endpoint not reachable. Check frontend logs: $MANAGE_SH logs frontend 200" >&2
  exit 5
fi

echo "Done. If UI still shows mock data, open the browser to http://127.0.0.1:${FRONTEND_PORT} and hard-refresh."

# End
