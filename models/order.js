const mongoose = require('mongoose');

const Order = mongoose.model('Order', new mongoose.Schema({
    ProductID:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product'  },
    CustomerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }
  })
);

module.exports = Order;
