FROM node:17

WORKDIR /usr/src/app

COPY ./package*.json .

RUN npm install
RUN npm install -g @angular/cli

COPY . .

EXPOSE 4200
EXPOSE 49153

CMD [ "npm", "start"]
