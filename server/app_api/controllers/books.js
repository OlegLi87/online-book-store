const Book = require('../models/book');
const errorHandler = require('../utils/errorHandler');

async function getBooks(req, res) {
  const books = await Book.find({});
  res.send(books);
}
async function getBookById(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    res.send(book);
  } catch (error) {
    errorHandler(error, res);
  }
}

module.exports = { getBooks, getBookById };
