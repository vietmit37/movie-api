FROM node:16

WORKDIR /usr/src/app

COPY package*.json .

RUN yarn install

RUN yarn prisma init

COPY . .

RUN npx prisma generate

EXPOSE 8080

CMD ["yarn","dev"]