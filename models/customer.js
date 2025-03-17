const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    Name:       { type: String, required: true },
    MiddleName: { type: String },
    LastName:   { type: String, required: true },
    Suffix:     { type: String },
    Username:   { type: String, required: true },
    Password:   { type: String, required: true },
  })
);

module.exports = Customer;
