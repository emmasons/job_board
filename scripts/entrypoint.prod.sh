#!/bin/sh

echo 'Starting app...'
npx prisma generate
npx prisma migrate deploy

# Set permissions for the Node.js user
RUN chmod 777 ./node_modules/.prisma/client/index.js
RUN chown node:node ./node_modules/.prisma/client/schema.prismas

# Fork a new process to run the backup script
(
  node db_backup.ts
) &

# Start the Next.js application
npm start
