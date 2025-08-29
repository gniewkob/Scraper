#!/usr/bin/env bash
set -euo pipefail

# Prune remote branches in batches, keeping only master by default.
# Usage:
#   scripts/prune_remote_branches.sh [remote] [batch_size]
# Env vars:
#   KEEP_PATTERN   regex of branches to keep (default: ^(master|HEAD)$)
#   DRY_RUN        set to 1 to only print planned deletions

remote="${1:-origin}"
batch="${2:-20}"
KEEP_PATTERN="${KEEP_PATTERN:-^(master|HEAD)$}"
DRY_RUN="${DRY_RUN:-0}"

mapfile -t branches < <(git branch -r | sed "s|$remote/||" | sort -u | grep -Ev "$KEEP_PATTERN" || true)

echo "Found ${#branches[@]} remote branches on '$remote' (excluding $KEEP_PATTERN)"

if (( ${#branches[@]} == 0 )); then
  echo "Nothing to delete."
  exit 0
fi

count=0
for b in "${branches[@]}"; do
  ((count++))
  echo "[$count/${#branches[@]}] deleting $remote/$b";
  if [[ "$DRY_RUN" != "1" ]]; then
    git push "$remote" --delete "$b" || true
  fi
  # sleep every N deletions to avoid API throttling/timeouts
  if (( count % batch == 0 )); then
    echo "Batch of $batch processed — sleeping 2s..."
    sleep 2
  fi
done

echo "Pruning fetched refs..."
git fetch "$remote" --prune
echo "Done."

