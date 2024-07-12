#!/bin/sh

echo 'Starting app...'
npx prisma generate
npx prisma migrate deploy 
npm start
