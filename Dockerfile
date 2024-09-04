FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src src
COPY public/robots.txt public/robots.txt
COPY config config
COPY favicon.png favicon.png
RUN npm run build
EXPOSE 1337
CMD [ "npm", "start" ]