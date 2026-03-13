const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Please provide customer name'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide contact phone number'],
  },
  deliveryAddress: {
    type: String,
    required: [true, 'Please provide delivery address'],
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Please provide product ID']
    },
    quantity: {
      type: Number,
      required: [true, 'Please provide product quantity'],
      min: 1
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price at time of order']
    }
  }],
  totalAmount: {
    type: Number,
    required: [true, 'Please provide total order amount']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['processing', 'shipped', 'delivered', 'cancelled'],
    default: 'processing'
  },
  paystackReference: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
