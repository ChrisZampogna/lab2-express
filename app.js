const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();

const PORT = process.env.EXPRESS_PORT;
const MONGO_URL = process.env.MONGO_URL;

const swaggerOptions = {
   swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'My API',
        version: '1.0.0',
        description: 'API documentation using Swagger',
      },
      servers: [
        {
           url: `http://localhost:${PORT}`,
        },
      ],
  components: {
    securitySchemes: {
      bearerAuth: {
         type: 'http',
         scheme: 'bearer',
         bearerFormat: 'JWT', 
      },
    },
 },
   },
   apis: ['./routes/*.js'], // Path to your API docs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(bodyParser.json());

// Log which port express is listening on
app.listen(PORT, function(){
    console.log(`Listening on port ${PORT}`);
});

// MongoDB Connection
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Customer router
app.use('/customer', require('./routes/customer'));

// Order router
app.use('/order', require('./routes/order'));

// Product router
app.use('/product', require('./routes/product'));
