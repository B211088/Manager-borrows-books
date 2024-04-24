const express = require('express');
const books = require('../controllers/books.controller');

const router = express.Router();

router.route('/')
        .get(books.findAll)
        .post(books.createBook);

router.route('/:id')
        .get(books.findOne)
        .put(books.updateBook)
        .delete(books.deleteBook);

module.exports = router;