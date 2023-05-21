FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm install 
RUN npm install -g postcss-cli
COPY . .
RUN npm run build:styles
RUN npm run build

CMD [ "npm" ,"run","dev"]
