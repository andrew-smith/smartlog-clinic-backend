FROM node:18.17.0-bullseye AS base

WORKDIR /usr/src/app

COPY package.json package-lock.json tsconfig.json ./

# Build container
FROM base AS build

RUN npm ci
COPY ./src ./src
RUN npm run build


# Download/compile production-only deps
FROM base AS deps

RUN apt-get update && apt-get install -y build-essential

RUN npm ci --production


# Final image container
FROM node:18.17.0-bullseye-slim

EXPOSE 3000

WORKDIR /usr/src/app
COPY package.json ./
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# Will speed up runtime if default PUID is used
RUN groupmod -o -g "$PUID" node && usermod -o -u "$PUID" node && \
    chown -R $PUID:$PUID /usr/src/app

COPY ./docker-entrypoint.sh /docker-entrypoint.sh
ENTRYPOINT [ "/docker-entrypoint.sh" ]
