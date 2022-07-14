FROM node:16.16-alpine AS base

RUN mkdir -p /stream-backend/node_modules

WORKDIR /stream-backend

RUN addgroup stream-backend && \
    adduser -S -G stream-backend stream-backend && \
    chown -R stream-backend /stream-backend

USER stream-backend

COPY --chown=stream-backend:stream-backend . .

RUN npm ci

FROM base AS env-dev
EXPOSE ${DEV_PORT}
CMD ["npm", "run", "dev"]

FROM base AS env-prod
ENV NODE_ENV=production
EXPOSE ${SERVER_PORT}
CMD ["npm", "start"]
