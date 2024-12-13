#!/usr/bin/env bash

echo 'Setting things up...'


npm install

cd nestjs-backend

if ! test -f .env; then
  echo ".env does not exist."
  cp .env.example .env
fi

npm install

cd ../resources/js/blog-frontend

if ! test -f .env; then
  echo ".env does not exist."
  cp .env.example .env
fi

npm install 

echo 'Setup done. To run all projects at once: npm run start'
