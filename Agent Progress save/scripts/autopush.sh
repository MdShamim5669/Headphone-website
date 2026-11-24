#!/usr/bin/env bash
# Background auto-push every 4 minutes. Stop it with:  kill "$(cat /tmp/autopush.pid)"
cd "$(git rev-parse --show-toplevel)" || exit 1
P="Agent Progress save"; mkdir -p "$P/scripts/logs"
echo $$ > /tmp/autopush.pid
INTERVAL="${AUTOPUSH_INTERVAL:-240}"   # seconds (180–300 recommended)
while true; do
  sleep "$INTERVAL"
  date '+%s' > "$P"/scripts/logs/autopush.heartbeat
  AUTO=1 "$P/scripts/checkpoint.sh" "auto: checkpoint $(date '+%H:%M')" \
    >> "$P"/scripts/logs/autopush.log 2>&1
  # keep the log small
  tail -n 200 "$P"/scripts/logs/autopush.log > "$P"/scripts/logs/autopush.tmp && \
    mv "$P"/scripts/logs/autopush.tmp "$P"/scripts/logs/autopush.log
done

