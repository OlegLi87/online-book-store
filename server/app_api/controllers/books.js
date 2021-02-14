const Book = require('../models/book');
const { ResponseError } = require('../middleware/errorHandler');

async function getBooks(req, res, next) {
  try {
    const books = await Book.find({});
    if (!books?.length) throw new ResponseError();
    res.send(books);
  } catch (error) {
    next(error);
  }
}

async function getBookById(req, res, next) {
  try {
    const book = await Book.findById(req.params.id).catch((err) => {
      throw new ResponseError(err.message, 400);
    });
    if (!book) throw new ResponseError();
    res.send(book);
  } catch (error) {
    next(error);
  }
}
async function createBook(req, res, next) {
  try {
    const book = new Book(req.body);
    const createdBook = await book.save().catch((err) => {
      throw new ResponseError(err.message, 400);
    });
    res.status(201).send(book);
  } catch (error) {
    next(error);
  }
}

async function updateBook(req, res, next) {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).catch((err) => {
      throw new ResponseError(err.message, 400);
    });
    if (!updatedBook) throw new ResponseError();
    res.send(updatedBook);
  } catch (error) {
    next(error);
  }
}

async function deleteBook(req, res, next) {
  try {
    const deletedBook = await Book.findByIdAndRemove(req.params.id).catch(
      (err) => {
        throw new ResponseError(err.message, 400);
      }
    );
    if (!deletedBook) throw new ResponseError();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
