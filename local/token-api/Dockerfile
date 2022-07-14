FROM node:16.16-alpine

RUN mkdir -p /stream-token-api/node_modules

COPY package.json yarn.lock index.mjs /stream-token-api/

RUN apk --no-cache add yarn --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community

WORKDIR /stream-token-api

RUN yarn install --pure-lockfile

EXPOSE 7000

CMD ["yarn", "start"]
