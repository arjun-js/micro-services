# specify the base image

FROM node:alpine

WORKDIR /usr/app

# install dependencies

COPY ./package.json ./
RUN npm install

COPY ./ ./

# base command

CMD ["npm", "start"]