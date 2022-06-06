FROM --platform=linux/amd64 node:current-alpine

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV production

RUN npm run build

expose 3000

CMD ["npm", "run", "start"]