#!/bin/sh
set -e

echo "============================================"
echo "  Chalkboard Docker Entrypoint"
echo "============================================"

# Function to wait for database
wait_for_db() {
  echo "Waiting for database to be ready..."

  # Extract host and port from DATABASE_URL
  DB_HOST=$(echo $DATABASE_URL | sed -n 's|.*@\([^:/]*\).*|\1|p')
  DB_PORT=$(echo $DATABASE_URL | sed -n 's|.*:\([0-9]*\)/.*|\1|p')
  DB_PORT=${DB_PORT:-5432}

  MAX_RETRIES=30
  RETRY_COUNT=0

  while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if pg_isready -h "$DB_HOST" -p "$DB_PORT" > /dev/null 2>&1; then
      echo "Database is ready!"
      return 0
    fi

    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo "Waiting for database... (attempt $RETRY_COUNT/$MAX_RETRIES)"
    sleep 2
  done

  echo "ERROR: Database not available after $MAX_RETRIES attempts"
  exit 1
}

# Function to run database setup
run_db_setup() {
  echo ""
  echo "Running database setup..."

  # Check if SKIP_DB_SETUP is set
  if [ "$SKIP_DB_SETUP" = "true" ]; then
    echo "Skipping database setup (SKIP_DB_SETUP=true)"
    return 0
  fi

  # Run drizzle-kit push to sync schema
  echo "Pushing database schema..."
  if bun run db:push 2>&1; then
    echo "Database schema synced successfully!"
  else
    echo "WARNING: db:push failed, trying migration:run..."
    if bun run migration:run 2>&1; then
      echo "Migrations completed successfully!"
    else
      echo "WARNING: Database setup had issues, continuing anyway..."
    fi
  fi

  # Run seeding if requested
  if [ "$RUN_DB_SEED" = "true" ]; then
    echo "Running database seed..."
    if bun run db:seed 2>&1; then
      echo "Database seeded successfully!"
    else
      echo "WARNING: Database seeding failed"
    fi
  fi
}

# Main execution
echo ""
echo "Environment:"
echo "  DEPLOYMENT_MODE: ${DEPLOYMENT_MODE:-auto}"
echo "  NODE_ENV: ${NODE_ENV:-production}"
echo "  SKIP_DB_SETUP: ${SKIP_DB_SETUP:-false}"
echo "  RUN_DB_SEED: ${RUN_DB_SEED:-false}"
echo ""

# Wait for database
wait_for_db

# Run database setup
run_db_setup

echo ""
echo "============================================"
echo "  Starting Chalkboard Application"
echo "============================================"
echo ""

# Execute the main command (node server.js)
exec "$@"
