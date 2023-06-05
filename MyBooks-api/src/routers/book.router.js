const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

router.get('/', bookController.getBook);
router.post('/', bookController.createBook);
router.put('/', bookController.updateBook);
router.delete('/', bookController.deleteBook);

module.exports = router;
