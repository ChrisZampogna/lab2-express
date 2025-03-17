const mongoose = require('mongoose');

const Order = mongoose.model('Order', new mongoose.Schema({
    ProductID:  {type: Schema.Types.ObjectId, ref: 'Product'},
    CustomerID: {type: Schema.Types.ObjectId, ref: 'Customer'}
  })
);

module.exports = Order;
