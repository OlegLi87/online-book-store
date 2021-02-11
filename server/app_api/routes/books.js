const router = require('express').Router();
const booksController = require('../controllers/books');

router.get('/books', (req, res) => {
  booksController.getBooks(req, res);
});

router.get('/books/:id', (req, res) => {
  booksController.getBookById(req, res);
});

router.post('/books', (req, res) => {
  booksController.createBook(req, res);
});

router.put('/books/:id', (req, res) => {
  booksController.updateBook(req, res);
});

router.delete('/books/:id', (req, res) => {
  booksController.deleteBook(req, res);
});

module.exports = router;
