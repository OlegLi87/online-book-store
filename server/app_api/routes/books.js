const router = require('express').Router();
const booksController = require('../controllers/books');
const { userAuth, adminAuth } = require('../middleware/auth');

router.get('/books', booksController.getBooks);
router.get('/books/:id', booksController.getBookById);
router.post('/books', userAuth, adminAuth, booksController.createBook);
router.put('/books/:id', userAuth, adminAuth, booksController.updateBook);
router.delete('/books/:id', userAuth, adminAuth, booksController.deleteBook);

module.exports = router;
