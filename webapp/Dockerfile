FROM node:boron
WORKDIR /usr/src/app

RUN npm install -g @angular/cli tslint typescript

COPY package.json /usr/src/app
RUN npm install

COPY . /usr/src/app

EXPOSE 4200

CMD ["npm", "start"]

