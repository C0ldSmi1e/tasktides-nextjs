FROM node:18-alpine AS base
# We only need netcat for database connection checks
RUN apk add --no-cache netcat-openbsd

FROM base AS deps
WORKDIR /app

# Copy package files for dependency installation
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# Install dependencies based on the available lock file
# Note: We keep sharp because it's commonly needed for Next.js image optimization
RUN \
  if [ -f yarn.lock ]; then \
  yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then \
  npm ci && \
  npm install sharp; \
  elif [ -f pnpm-lock.yaml ]; then \
  corepack enable pnpm && \
  pnpm install --frozen-lockfile; \
  else \
  echo "No lockfile found. Please provide yarn.lock, package-lock.json, or pnpm-lock.yaml" && \
  exit 1; \
  fi

FROM base AS builder
WORKDIR /app

# Copy dependencies and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client during build phase
# This is crucial for avoiding the initialization error you encountered
RUN npx prisma generate

# Build the Next.js application
RUN \
  if [ -f yarn.lock ]; then \
  yarn build; \
  elif [ -f package-lock.json ]; then \
  npm run build; \
  elif [ -f pnpm-lock.yaml ]; then \
  pnpm run build; \
  fi

FROM base AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production \
  PORT=8090

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs

# Set up directory structure
RUN mkdir -p scripts .next
COPY --chown=nextjs:nodejs scripts/init.sh ./scripts/
RUN chmod +x ./scripts/init.sh

# Copy build outputs and necessary files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./

# Set correct permissions
RUN chown nextjs:nodejs .next && \
  chown -R nextjs:nodejs /app/node_modules && \
  chown nextjs:nodejs ./scripts/init.sh

# Switch to non-root user
USER nextjs
EXPOSE 8090
ENV PORT=8090

# Change the CMD to use the initialization script
CMD ["/app/scripts/init.sh"]