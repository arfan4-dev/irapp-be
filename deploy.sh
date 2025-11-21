#!/bin/bash
set -e

echo "====== DEPLOYMENT STARTED ======"

echo ">>> Pulling latest code from master branch..."
# Yahan 'git' ka poora path likhein
/usr/bin/git pull origin master

echo ">>> Installing NPM dependencies..."
# Yahan 'npm' ka poora path likhein
/usr/bin/npm install --production

echo ">>> Restarting application with PM2..."
# Yahan 'pm2' ka poora path likhein
/usr/bin/pm2 restart irapp-be --update-env

echo "====== DEPLOYMENT COMPLETED SUCCESSFULLY ======"
