const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
  },
  sku: {
    type: Number,
    unique: true,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
  },
  deletionComment: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('product', productSchema);
