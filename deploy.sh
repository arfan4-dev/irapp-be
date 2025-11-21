#!/bin/bash
set -e
echo "====== DEPLOYMENT STARTED ======"
echo ">>> Pulling latest code from master branch..."
git pull origin master
echo ">>> Installing NPM dependencies..."
npm install --production
echo ">>> Restarting application with PM2..."
pm2 restart irapp-be --update-env
echo "====== DEPLOYMENT COMPLETED SUCCESSFULLY ======"