FROM jlcolbert/primo-explore-devenv:latest

ENV VIEW ${VIEW}
ENV DEVENV_PATH /app

WORKDIR /app/primo-explore/

# Installs Node modules, along with inner repository node_modules
COPY yarn.lock package.json ./
COPY custom/01USNH_UNH-EXPLORE/package.json ./custom/01USNH_UNH-EXPLORE/package.json
COPY custom/01USNH_UNH-LAW/package.json ./custom/01USNH_UNH-LAW/package.json
COPY custom/01USNH_UNH-MAIN/package.json ./custom/01USNH_UNH-MAIN/package.json
COPY custom/01USNH_UNH-MANCH/package.json ./custom/01USNH_UNH-MANCH/package.json

# Installs production version of dependencies from NPM
RUN yarn set version berry && yarn config set nodeLinker node-modules && yarn install

# Copies remaining VIEW files
COPY ./custom/ ./custom/

# Sets up for running as a container
WORKDIR ${DEVENV_PATH}

EXPOSE 8003 3001
