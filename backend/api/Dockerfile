FROM node:20-alpine AS base

RUN yarn set version 4.5.0

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY . .

RUN yarn dlx turbo prune @yeager/api --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN yarn install

# Build the project
COPY --from=builder /app/out/full/ .
COPY --from=builder /app/.yarnrc.yml .
COPY --from=builder /app/commitlint.config.js .
COPY --from=builder /app/eslint.config.js .
COPY --from=builder /app/tsconfig.json .
COPY --from=builder /app/yarn.config.cjs .

RUN yarn backend-build

FROM base as runner
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 userjs
USER userjs

COPY --from=installer --chown=userjs:nodejs /app/ .

# TODO: pass variables with docker compose
RUN echo "NODE_ENV=Production" >> /app/backend/api/.env \
    && echo "PINATA_JWT=..." >> /app/backend/api/.env \
    && echo "PINATA_GATEWAY_URL=..." >> /app/backend/api/.env \
    && echo "NETWORK=Sepolia" >> /app/backend/api/.env \
    && echo "WALLET_PRIVATE_KEY=..." >> /app/backend/api/.env \
    && echo "CONTRACT_ADDRESS=0x47bd5885386087A5Efc6e2A0eA16074BBBa4002e" >> /app/backend/api/.env \
    && echo "INFURA_API_KEY=..." >> /app/backend/api/.env \
    && echo "WEB_APP_URL=http://yeager.elie-atamech.com" >> /app/backend/api/.env

EXPOSE 80

CMD yarn run backend-start