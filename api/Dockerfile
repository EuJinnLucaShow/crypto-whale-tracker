# Stage 1: Build
# Ми використовуємо конкретну версію з тегом 'latest-dev', але фіксуємо її версією 20
FROM cgr.dev/chainguard/node:20-dev AS builder
WORKDIR /app

# Перемикаємось на root для встановлення системних пакетів
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
# Фіксуємо версію 20 для рантайму
FROM cgr.dev/chainguard/node:20
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["dist/main.js"]