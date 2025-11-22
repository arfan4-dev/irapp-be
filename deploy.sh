#!/bin/bash
set -e

echo "====== DEPLOYMENT STARTED ======"

echo ">>> Pulling latest code from master branch..."
/usr/bin/git pull origin master

echo ">>> Installing NPM dependencies..."
# Yahan --ignore-scripts add kiya hai
/usr/bin/npm install --production --ignore-scripts

echo ">>> Restarting application with PM2..."
/usr/bin/pm2 restart irapp-be --update-env

echo "====== DEPLOYMENT COMPLETED SUCCESSFULLY ======"
