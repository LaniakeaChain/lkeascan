
FROM node:12.14.1-alpine

RUN apk add --no-cache --update openssh tini bash wget libc6-compat

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

ENTRYPOINT ./entrypoint.sh
