#!/bin/sh
set -e

# Replace the placeholder in env.js with the actual env variable
if [ -n "$VITE_AI_SERVER_URL" ]; then
  sed -i "s|__VITE_AI_SERVER_URL__|$VITE_AI_SERVER_URL|g" /usr/share/nginx/html/env.js
fi

exec nginx -g "daemon off;"
