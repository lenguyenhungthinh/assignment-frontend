#!/bin/sh
su node -c "cd /app && dumb-init node server.js"