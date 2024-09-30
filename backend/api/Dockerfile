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

EXPOSE 80

CMD yarn run backend-start