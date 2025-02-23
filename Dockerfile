FROM node:18-alpine3.17

WORKDIR /usr/app

COPY package*.json /usr/app/

RUN npm install

COPY . .

ENV MONGO_URI=mongodb://172.20.0.4:27017/solar?authSource=admin
ENV MONGO_USERNAME=admin
ENV MONGO_PASSWORD=admin123

EXPOSE 3000

CMD [ "npm", "start" ]