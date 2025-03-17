FROM node
WORKDIR /app
COPY package.json /app
RUN npm install express mongoose body-parser swagger-ui-express swagger-jsdoc
COPY . /app
CMD ["node","app.js"]
