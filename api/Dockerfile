# Stage 1: Build
FROM cgr.dev/chainguard/node:latest-dev@sha256:<digest> AS builder
WORKDIR /app

USER root
RUN apk add --no-cache openssl
USER node

COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci
RUN npx prisma generate
COPY . .
RUN npm run build
RUN npm prune --production

# Stage 2: Runtime
FROM cgr.dev/chainguard/node:latest@sha256:<digest>
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["dist/main.js"]