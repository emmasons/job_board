#!/bin/sh

echo 'Starting app...'
npx prisma generate
npx prisma migrate deploy

# Initialize the cron job
node db_backup.ts

npm start
