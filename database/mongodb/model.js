const db = require('./index.js');
const mongoose = require('mongoose');

const Review = new mongoose.Schema(
  {
    productId: {type: Number, require: true},
    productName: {type: String, require: true},
    reviews: {type: Array, require: true }
  }
);

const Reviews = mongoose.model('Reviews', Review);

module.exports = Reviews;
;
