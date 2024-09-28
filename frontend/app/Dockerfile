FROM node:lts-alpine as base

RUN yarn set version 4.5.0

# build stage
FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY . .

RUN yarn dlx turbo prune @yeager/web-client-app --docker

FROM base AS installer
RUN apk update && apk add bash
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=builder /app/out/json/ .
RUN yarn install

COPY --from=builder /app/out/full/ .

COPY --from=builder /app/.yarnrc.yml .
COPY --from=builder /app/commitlint.config.js .
COPY --from=builder /app/eslint.config.js .
COPY --from=builder /app/tsconfig.json .
COPY --from=builder /app/yarn.config.cjs .

RUN yarn run frontend-build


FROM nginx:stable-alpine as runner
RUN apk update && apk add bash

COPY --from=installer /app/frontend/app/nginx.conf /etc/nginx

COPY --from=installer /app/frontend/app/dist /usr/share/nginx/html

COPY frontend/app/env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]