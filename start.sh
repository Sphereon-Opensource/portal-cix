export PORT=8000
screen -dmS portal-cix bash -c 'cd /opt/portal-cix && npm run start:prod >> /tmp/portal-cix.log 2>&1'

#pnpm run start:prod
