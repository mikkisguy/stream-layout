#!/bin/bash
yarn install
yarn build
docker build -t mikkisguy-stream-frontend .
