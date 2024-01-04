#!/bin/bash
if [[ $1 = "prod" || $1 = "dev" ]] && [[ $2 = "up" || $2 = "down" || $2 = "watch" ]]; then
  echo "Deploying $1 $2"
  dockerFile="docker-compose.$1.yml"
  direction=$2
  docker compose -f $dockerFile $direction
else
  echo 'Need to follow format ./deploy.sh <prod|dev> <up|down|watch>'
fi