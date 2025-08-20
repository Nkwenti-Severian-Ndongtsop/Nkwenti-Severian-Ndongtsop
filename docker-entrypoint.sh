#!/bin/sh
set -e

# Set default values if not provided
: "${VITE_AI_SERVER_URL:=http://localhost:3001}"

# Create env.js file with runtime environment variables
cat > /usr/share/nginx/html/env/env.js <<EOL
window.env = {
  VITE_AI_SERVER_URL: "${VITE_AI_SERVER_URL}"
};
EOL

# Replace environment variables in the built files
find /usr/share/nginx/html -type f -name "*.js" -o -name "*.html" | xargs sed -i 's|VITE_AI_SERVER_URL|'"${VITE_AI_SERVER_URL}"'|g'

# Execute the command passed to the container
exec "$@"
