#!/bin/bash
# task-manager.sh - Manage Claude's pending tasks count
# Usage: ./task-manager.sh [set|clear|increment|decrement] [count]

PENDING_FILE="${HOME}/.claude/tasks_pending"
ACTION=$1
COUNT=$2

# Ensure the directory exists with proper permissions
mkdir -p "${HOME}/.claude"
chmod 700 "${HOME}/.claude"

case "$ACTION" in
  set)
    if [[ -z "$COUNT" ]]; then
      echo "Error: COUNT required for set action"
      exit 1
    fi
    echo "$COUNT" > "$PENDING_FILE"
    chmod 600 "$PENDING_FILE"
    echo "Set pending tasks to: $COUNT"
    ;;
    
  clear)
    rm -f "$PENDING_FILE"
    echo "Cleared all pending tasks"
    ;;
    
  increment)
    CURRENT=$(cat "$PENDING_FILE" 2>/dev/null || echo "0")
    NEW_COUNT=$((CURRENT + 1))
    echo "$NEW_COUNT" > "$PENDING_FILE"
    chmod 600 "$PENDING_FILE"
    echo "Incremented pending tasks to: $NEW_COUNT"
    ;;
    
  decrement)
    CURRENT=$(cat "$PENDING_FILE" 2>/dev/null || echo "0")
    NEW_COUNT=$((CURRENT - 1))
    if [[ $NEW_COUNT -le 0 ]]; then
      rm -f "$PENDING_FILE"
      echo "No pending tasks remaining"
    else
      echo "$NEW_COUNT" > "$PENDING_FILE"
      chmod 600 "$PENDING_FILE"
      echo "Decremented pending tasks to: $NEW_COUNT"
    fi
    ;;
    
  status)
    if [[ -f "$PENDING_FILE" ]]; then
      COUNT=$(cat "$PENDING_FILE" 2>/dev/null || echo "0")
      echo "Pending tasks: $COUNT"
    else
      echo "No pending tasks"
    fi
    ;;
    
  *)
    echo "Usage: $0 [set|clear|increment|decrement|status] [count]"
    echo "  set COUNT     - Set pending tasks to COUNT"
    echo "  clear         - Clear all pending tasks"
    echo "  increment     - Add one pending task"
    echo "  decrement     - Remove one pending task"
    echo "  status        - Show current pending tasks"
    exit 1
    ;;
esac