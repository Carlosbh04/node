const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.addBook);
router.put('/', bookController.updateBook);
router.delete('/', bookController.deleteBook);

module.exports = router;
