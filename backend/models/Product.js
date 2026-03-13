const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
  },
  image: {
    type: String,
    required: [true, 'Please provide product image URL'],
  },
  description: {
    type: String,
    required: [true, 'Please provide product description'],
  },
  stock: {
    type: Number,
    required: [true, 'Please provide product stock quantity'],
    default: 0,
    min: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
