#!/bin/sh
set -e

# Wait for database connection with a timeout
echo 'Waiting for postgres...'
timeout=60
counter=0
while ! nc -z postgres 5432; do
    sleep 1
    counter=$((counter + 1))
    if [ $counter -ge $timeout ]; then
        echo "Error: Timed out waiting for PostgreSQL after ${timeout} seconds"
        exit 1
    fi
done
echo 'PostgreSQL started'

# Generate Prisma Client
echo 'Generating Prisma Client...'
npx prisma generate

# Apply migrations from your migration history
echo 'Applying database migrations...'
npx prisma migrate deploy

# Start the Next.js server
echo 'Starting Next.js server...'
exec node server.js