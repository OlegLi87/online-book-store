const router = require('express').Router();
const booksController = require('../controllers/books');

router.get('/books', (req, res) => {
  booksController.getBooks(req, res);
});

router.get('/books/:id', (req, res) => {
  booksController.getBookById(req, res);
});

module.exports = router;
