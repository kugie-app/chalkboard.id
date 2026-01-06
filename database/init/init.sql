-- Initial database setup for Chalkboard.id
-- This script will run when the PostgreSQL container is first created

-- Create additional databases if needed
-- CREATE DATABASE chalkboard_dev;
-- CREATE DATABASE chalkboard_test;

-- Set timezone
SET timezone = 'UTC';

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- Grant necessary permissions
GRANT ALL PRIVILEGES ON DATABASE chalkboard TO postgres;

-- Create a dedicated user for the application (optional, for production)
-- CREATE USER chalkboard_app WITH ENCRYPTED PASSWORD 'secure_password';
-- GRANT CONNECT ON DATABASE chalkboard TO chalkboard_app;
-- GRANT USAGE ON SCHEMA public TO chalkboard_app;
-- GRANT CREATE ON SCHEMA public TO chalkboard_app;