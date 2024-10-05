FROM node:20-alpine AS base

RUN yarn set version 4.5.0

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY . .

RUN yarn dlx turbo prune @yeager/nft --docker

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

FROM base as runner
RUN apk update && apk add bash
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=installer /app/ .

# TODO: pass variables with docker compose
RUN echo "PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80" >> /app/packages/nft/.env \
    && echo "ADDRESS=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" >> /app/packages/nft/.env

EXPOSE 8545

CMD yarn run run-net-local