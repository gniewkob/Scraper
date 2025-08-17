#!/usr/bin/env bash

PORT=38273
CMD="uvicorn backend.main:app --host 127.0.0.1 --port $PORT --reload"

# Stop running Uvicorn processes
PIDS=$(pgrep -f "uvicorn")
if [ -n "$PIDS" ]; then
  echo "Stopping existing Uvicorn processes: $PIDS"
  kill "$PIDS"
  sleep 2
  REMAINING=$(pgrep -f "uvicorn")
  if [ -n "$REMAINING" ]; then
    echo "Force killing remaining Uvicorn processes: $REMAINING"
    kill -9 "$REMAINING"
  fi
fi

# Start backend
echo "Starting backend on port $PORT"
$CMD &
