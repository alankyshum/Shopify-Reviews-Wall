#!/bin/bash
yarn install
yarn --cwd /app build
yarn --cwd /app migrate direct
yarn --cwd /app start
