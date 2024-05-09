FROM node:20

WORKDIR /usr/src/app

COPY package.json .

RUN npm install
RUN npm install serve -g

COPY . .

RUN npm run build

EXPOSE 5173

CMD [ "serve", "-s", "-l", "5173", "dist" ]