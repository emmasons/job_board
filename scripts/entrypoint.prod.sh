#!/bin/sh

echo 'Starting app...'
npx prisma generate
npx prisma migrate deploy
npx prisma db push --accept-data-loss 
npm start
