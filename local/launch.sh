#!/bin/bash
docker compose down

cd frontend/
yarn install
yarn build
docker build -t mikkisguy-stream-frontend .

cd ../token-api/
docker build -t mikkisguy-stream-tokenapi .

cd ../
docker compose up -d
