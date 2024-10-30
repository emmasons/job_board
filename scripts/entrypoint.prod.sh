#!/bin/sh

echo 'Starting app...'
npx prisma generate
npx prisma migrate deploy

# Set permissions for the Node.js user
chmod -R 777 ./node_modules
chown node:node ./node_modules/.prisma/client/schema.prisma

# Fork a new process to run the backup script
(
  node db_backup.ts
) &

# Start the Next.js application
npm start
