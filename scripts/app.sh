#!/bin/bash
errorMessage="Need to follow format ./app.sh <prod|dev> <up|down>"

mode=$1
direction=$2

if [ $mode != "dev" ] && [ $mode != "prod" ] || [ $direction != "up" ] && [ $direction != "down" ]; then
  echo "mode: $mode"
  echo "direction: $direction"
  echo $errorMessage
  exit 1
fi

if [ $mode = "dev" ]; then
  if [ $direction = "up" ]; then
    docker compose up -d

    nginx -c ./packages/config/nginx/nginx.conf

    pnpm dev
  elif [ $direction = "down" ]; then
    docker compose stop

    nginx -s stop
  fi
elif [ $mode = "prod" ]; then
  if [ $direction = "up" ]; then
    docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
  elif [ $direction = "down" ]; then
    docker compose -f docker-compose.yml -f docker-compose.prod.yml stop
  fi
else
  echo $errorMessage
  exit 1
fi