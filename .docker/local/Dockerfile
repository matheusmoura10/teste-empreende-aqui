FROM node:21-alpine

WORKDIR /usr/app

COPY package*.json ./

ENV FORCE_COLOR=1

RUN npm install && npm cache clean --force

COPY . .
EXPOSE 3000

CMD ["npm", "run", "start:dev"]