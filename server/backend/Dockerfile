FROM node:16.16-alpine AS base

RUN mkdir -p /stream-backend/node_modules

RUN addgroup stream-backend && \
    adduser -S -G stream-backend stream-backend && \
    chown -R stream-backend /stream-backend

RUN apk --no-cache add yarn --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community

WORKDIR /stream-backend

USER stream-backend

COPY --chown=stream-backend:stream-backend . .

RUN yarn install --pure-lockfile

FROM base AS env-dev
EXPOSE ${DEV_PORT}
CMD ["yarn", "dev"]

FROM base AS env-prod
ENV NODE_ENV=production
EXPOSE ${SERVER_PORT}
CMD ["yarn", "start"]
