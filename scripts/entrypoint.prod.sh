#!/bin/sh

echo 'Starting app...'
npx prisma generate
npx prisma migrate deploy

# Fork a new process to run the backup script
(
  node db_backup.ts
) &

# Start the Next.js application
npm start
