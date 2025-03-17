const mongoose = require('mongoose');

const Product = mongoose.model('Product', new mongoose.Schema({
    Name:        { type: String, required: true },
    Description: { type: String, required: true },
    SKU:         { type: String, required: true },
    Price:       { type: Number, required: true },
    Weight:      { type: Number, required: true },
    Height:      { type: Number, required: true },
    Length:      { type: Number, required: true },
  })
);

module.exports = Product;
