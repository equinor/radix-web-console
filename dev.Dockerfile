FROM node:carbon-alpine

WORKDIR /app
COPY package*.json ./
VOLUME [ "/app/node_modules" ]

CMD [ "sh", "-c", "npm install --prefer-offline --no-audit && npm start" ]
