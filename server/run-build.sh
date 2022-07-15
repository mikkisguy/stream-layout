#!/bin/bash
sudo docker build --target env-prod -t mikkisguy-stream-backend-prod ./backend/
sudo docker build --target env-dev -t mikkisguy-stream-backend-dev ./backend/
