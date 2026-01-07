#!/bin/sh
set -e

echo "Starting application initialization..."

# Run database push with force flag
echo "Running database migrations..."
bun run db:push --force

echo "Database setup complete. Starting application..."

# Start the application
exec bun start