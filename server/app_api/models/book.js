const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minLength: 100,
  },
  category: {
    type: [
      {
        type: String,
        required: true,
      },
    ],
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  rating: {
    type: Number,
    required: true,
    max: 5,
    min: 1,
    default: 3,
  },
  publishDate: {
    type: Date,
    required: true,
  },
  arrivalDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Book', bookSchema, 'books');
