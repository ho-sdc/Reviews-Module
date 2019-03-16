FROM node:10

WORKDIR /app

COPY . /app

RUN npm install --only=prod

EXPOSE 3003

CMD ["npm", "start"]