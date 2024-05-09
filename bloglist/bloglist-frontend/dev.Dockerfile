FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm install vite --save-dev

CMD ["npm", "run", "dev", "--", "--host"]