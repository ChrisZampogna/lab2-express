const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.EXPRESS_PORT;
const MONGO_URL = process.env.MONGO_URL;

// Middleware
app.use(bodyParser.json());

// Hello world at root endpoint
app.get("/", function(req, res) {
    return res.send("Hello World");
});

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

// Routes
const customerRouter = require('./routes/customer');
app.use('/customer', customerRouter);
