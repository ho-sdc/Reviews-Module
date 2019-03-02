const db = require('./index.js');
const mongoose = require('mongoose');

const Review = new mongoose.Schema(
  {
    productId: { type: Number, require: true },
    reviews: {type: Array, require: true }
  }
);

const Reviews = mongoose.model('Reviews', Review);

module.exports = Reviews;



// user: { type: String, require: true },
// header: { type: String, require: true },
// description: { type: String, require: true },
// date: { type: Date, require: true },
// rating: { type: Number, require: true },
// size: { type: Number, require: true },
// width: { type: Number, require: true },
// comfort: { type: Number, require: true },
// quality: { type: Number, require: true },
// recommended: { type: Boolean, require: true },
// yes: { type: Number, require: true },
// nope: { type: Number, require: true }