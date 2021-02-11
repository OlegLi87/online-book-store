const Book = require('../models/book');
const errorHandler = require('../utils/errorHandler');
const responseSender = require('../utils/responseSender');

async function getBooks(req, res) {
  try {
    const books = await Book.find({});
    responseSender(res, books);
  } catch (error) {
    errorHandler(res, error);
  }
}

async function getBookById(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    responseSender(res, book);
  } catch (error) {
    errorHandler(res, error);
  }
}

async function createBook(req, res) {
  try {
    const book = new Book(req.body);
    const createdBook = await book.save();
    responseSender(res, createdBook, 201);
  } catch (error) {
    errorHandler(res, error);
  }
}

async function updateBook(req, res) {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    responseSender(res, updatedBook);
  } catch (error) {
    errorHandler(res, error);
  }
}

async function deleteBook(req, res) {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    responseSender(res, deletedBook, 204);
  } catch (error) {
    errorHandler(res, error);
  }
}

module.exports = { getBooks, getBookById, createBook, updateBook, deleteBook };
