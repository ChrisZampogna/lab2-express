FROM node
WORKDIR /app
COPY package.json /app
RUN npm install express mongoose body-parser
COPY . /app
CMD ["node","app.js"]
