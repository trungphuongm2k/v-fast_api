FROM node:16.15.0-bullseye-slim

WORKDIR /home/node/app

COPY . .

RUN npm install

RUN npm run build

CMD [ "node", "." ]
