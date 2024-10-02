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

RUN echo "VITE_NETWORK=MY_VITE_NETWORK" >> /app/frontend/app/.env \
    && echo "VITE_NODE_ENV=MY_VITE_NODE_ENV" >> /app/frontend/app/.env \
    && echo "VITE_APP_NAME=MY_VITE_APP_NAME" >> /app/frontend/app/.env \
    && echo "VITE_HOST_URL=MY_VITE_HOST_URL" >> /app/frontend/app/.env \
    && echo "VITE_CONTRACT_ADDRESS=MY_VITE_CONTRACT_ADDRESS" >> /app/frontend/app/.env \
    && echo "VITE_PINATA_GATEWAY_URL=MY_VITE_PINATA_GATEWAY_URL" >> /app/frontend/app/.env

RUN yarn run frontend-build


FROM nginx:stable-alpine as runner
RUN apk update && apk add bash

COPY --from=installer /app/frontend/app/nginx.conf /etc/nginx

COPY --from=installer /app/frontend/app/dist /usr/share/nginx/html

COPY frontend/app/env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]