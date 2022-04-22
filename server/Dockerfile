FROM node:17 as builder

WORKDIR /usr/src/app

COPY ./package*.json .

RUN npm install

COPY . .

# STAGE 2

FROM node:17-alpine

WORKDIR /usr/src/app

RUN apk add github-cli

COPY --from=builder /usr/src/app .

EXPOSE 8080

CMD ["npm", "run", "dev"]
#CMD ["npm", "start"]