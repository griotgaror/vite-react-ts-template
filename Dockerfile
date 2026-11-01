FROM node:20.16-alpine AS build
LABEL stage=build-stage

WORKDIR /frontend

COPY src src
COPY app.config.ts app.config.ts
COPY .babelrc .babelrc
COPY bun.lockb bun.lockb
COPY index.html index.html
COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY vite.config.mts vite.config.mts
COPY vite.dev.config.ts vite.dev.config.ts
COPY vite.prod.config.ts vite.prod.config.ts
COPY vite.plugin.fonts.ts ./

RUN npm i

ARG BUILD_COMMAND
RUN ${BUILD_COMMAND}

FROM nginx:1.25.2-alpine

RUN rm -rf etc/nginx/nginx.conf
COPY nginx.conf etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /frontend/build /usr/share/nginx/html/
