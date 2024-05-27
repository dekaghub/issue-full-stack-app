FROM node:18-alpine AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies - clean install
RUN npm ci

# Rebuild source code only when needed
FROM base as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
# Copy the rest of the application code
COPY . .

# Disable NextJS telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Build arguments for environment variables
ARG SUPABASE_URL
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET

# Set environment variables
ENV SUPABASE_URL=$SUPABASE_URL
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET

# Build the Next.js application
RUN npx prisma generate && npm run build

# PROD image, copy all files then run next
FROM base AS runner
WORKDIR /app

# Set env to PROD
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD HOSTNAME="0.0.0.0" node server.js
