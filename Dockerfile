# syntax=docker.io/docker/dockerfile:1

FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Install bun
RUN npm install -g bun
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies using bun
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
ARG DATABASE_URL
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG DEFAULT_EMAIL
ARG DEFAULT_PASSWORD
ARG DEPLOYMENT_MODE=auto
ARG USE_SERVERLESS_DB
ARG DB_POOLING
ARG NEXT_RUNTIME

ENV DATABASE_URL=${DATABASE_URL}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ENV DEFAULT_EMAIL=${DEFAULT_EMAIL}
ENV DEFAULT_PASSWORD=${DEFAULT_PASSWORD}
ENV DEPLOYMENT_MODE=${DEPLOYMENT_MODE}
ENV USE_SERVERLESS_DB=${USE_SERVERLESS_DB}
ENV DB_POOLING=${DB_POOLING}
ENV NEXT_RUNTIME=${NEXT_RUNTIME}

# Install bun in builder stage
RUN npm install -g bun

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

# Build using bun
RUN bun run build

# Production image, copy all the files and run next
FROM base AS runner

# Install PostgreSQL client tools for database readiness checks and bun
RUN apk add --no-cache postgresql-client
RUN npm install -g bun

WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Copy package.json and bun.lock for bun scripts (migrations, seeding)
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/bun.lock* ./

# Copy database related files (with proper ownership)
COPY --from=builder --chown=nextjs:nodejs /app/drizzle ./drizzle
COPY --from=builder --chown=nextjs:nodejs /app/drizzle.config.ts ./drizzle.config.ts

# Copy entrypoint script (before USER nextjs)
COPY docker-entrypoint.sh /app/
RUN chmod +x /app/docker-entrypoint.sh

# Copy source files needed for migrations (with proper ownership)
COPY --from=builder --chown=nextjs:nodejs /app/src ./src
# Copy node_modules to run bun scripts
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
# Copy TypeScript config for drizzle
COPY --from=builder --chown=nextjs:nodejs /app/tsconfig.json ./tsconfig.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"

# Change ownership of entrypoint script to nextjs user
RUN chown nextjs:nodejs /app/docker-entrypoint.sh

ENTRYPOINT ["/app/docker-entrypoint.sh"]