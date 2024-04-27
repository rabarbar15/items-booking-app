FROM alpine:3.19.1

RUN apk update && apk upgrade
RUN apk add --update nodejs npm sqlite

WORKDIR /backend
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

VOLUME /backend/node_modules

CMD ["sh", "-c", "cd /backend && npm run start"]