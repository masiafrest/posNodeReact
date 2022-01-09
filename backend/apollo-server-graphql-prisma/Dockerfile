FROM node:16-slim as builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/ 

RUN npm run install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]