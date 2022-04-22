# syntax=docker/dockerfile:1
FROM jlcolbert/primo-explore-devenv:latest AS build

ENV DEVENV_PATH=/app

WORKDIR /app/primo-explore/

# Installs Node modules, along with inner repository node_modules
COPY yarn.lock package.json ./
COPY custom/01USNH_UNH-EXPLORE/package.json ./custom/01USNH_UNH-EXPLORE/package.json
COPY custom/01USNH_UNH-LAW/package.json ./custom/01USNH_UNH-LAW/package.json
COPY custom/01USNH_UNH-MAIN/package.json ./custom/01USNH_UNH-MAIN/package.json
COPY custom/01USNH_UNH-MANCH/package.json ./custom/01USNH_UNH-MANCH/package.json

# Installs production version of dependencies from NPM
RUN yarn set version latest && yarn config set nodeLinker node-modules && yarn install

FROM build
# Copies remaining VIEW files
COPY ./custom/ ./custom/

# Sets up for running as a container
WORKDIR ${DEVENV_PATH}

EXPOSE 8003 3001
