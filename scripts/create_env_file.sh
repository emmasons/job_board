#!/usr/bin/env bash

create_env_file() {
    touch .env
    echo "DATABASE_URL=${DATABASE_URL}" >> .env
    echo "GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}" >> .env
    echo "GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}" >> .env
    echo "GITHUB_ID=${GITHUB_ID}" >> .env
    echo "GITHUB_SECRET=${GITHUB_SECRET}" >> .env
    echo "NEXTAUTH_URL=${NEXTAUTH_URL}" >> .env
    echo "NEXTAUTH_SECRET=${NEXTAUTH_SECRET}" >> .env
    echo "GS_BUCKET_URL=${GS_BUCKET_URL}" >> .env
    echo "GS_CREDENTIALS=${GS_CREDENTIALS}" >> .env
    echo "GS_BUCKET_NAME=${GS_BUCKET_NAME}" >> .env
    echo "GS_LOCATION=${GS_LOCATION}" >> .env
    echo "GS_PUBLIC_BUCKET_NAME=${GS_PUBLIC_BUCKET_NAME}" >> .env
    echo "SERVICE_ID=${SERVICE_ID}" >> .env
    echo "DEFAULT_TEMPLATE_ID=${DEFAULT_TEMPLATE_ID}" >> .env
    echo "PUBLIC_KEY=${PUBLIC_KEY}" >> .env
    echo "PRIVATE_KEY=${PRIVATE_KEY}" >> .env
    echo "ADMIN_EMAIL=${ADMIN_EMAIL}" >> .env
    echo "BASE_DOMAIN=${BASE_DOMAIN}" >> .env
    echo "NODE_ENV=${NODE_ENV}" >> .env

    # email 
    echo "SMTP_EMAIL_HOST=${SMTP_EMAIL_HOST}" >> .env
    echo "SMTP_EMAIL_PORT=${SMTP_EMAIL_PORT}" >> .env
    echo "SMTP_AUTH_USER=${SMTP_AUTH_USER}" >> .env
    echo "SMTP_AUTH_PASSWORD=${SMTP_AUTH_PASSWORD}" >> .env
    echo "TEST_RECIPIENT=${TEST_RECIPIENT}" >> .env
}
main(){
    create_env_file
}
main