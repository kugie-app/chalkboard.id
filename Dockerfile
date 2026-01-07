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

# Copy entrypoint script
COPY --chown=nextjs:nodejs docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

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

# Create startup script before switching to nextjs user
RUN echo '#!/bin/sh' > /app/startup.sh && \
    echo 'echo "🚀 Starting up..."' >> /app/startup.sh && \
    echo '' >> /app/startup.sh && \
    echo '# Wait for database to be ready' >> /app/startup.sh && \
    echo 'echo "⏳ Waiting for database..."' >> /app/startup.sh && \
    echo 'for i in $(seq 1 30); do' >> /app/startup.sh && \
    echo '  if pg_isready -h $(echo $DATABASE_URL | sed -n "s/.*@\([^:]*\).*/\1/p") -p 5432 > /dev/null 2>&1; then' >> /app/startup.sh && \
    echo '    echo "✅ Database is ready!"' >> /app/startup.sh && \
    echo '    break' >> /app/startup.sh && \
    echo '  fi' >> /app/startup.sh && \
    echo '  echo "Waiting for database... ($i/30)"' >> /app/startup.sh && \
    echo '  sleep 1' >> /app/startup.sh && \
    echo 'done' >> /app/startup.sh && \
    echo '' >> /app/startup.sh && \
    echo 'echo "🔄 Running database migrations..."' >> /app/startup.sh && \
    echo 'bun run db:push || { echo "⚠️  Migration failed, but continuing..."; }' >> /app/startup.sh && \
    echo '' >> /app/startup.sh && \
    echo 'echo "✅ Starting application..."' >> /app/startup.sh && \
    echo 'exec node server.js' >> /app/startup.sh && \
    chmod +x /app/startup.sh && \
    chown nextjs:nodejs /app/startup.sh

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"

CMD ["/usr/local/bin/docker-entrypoint.sh"]