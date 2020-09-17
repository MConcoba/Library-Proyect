'use strict';

var express = require('express');
var BookController = require('../controllers/book.controller');
var md_auth = require('../middleware/autentificated');

var api = require('express-promise-router')();

api.post('/new-book', md_auth.ensureAuth, BookController.newBook);
api.get('/get-books', BookController.getBooks);
api.get('/get-book/:idBook', BookController.getBook);
api.put('/update-book/:idBook', md_auth.ensureAuth, BookController.updateBook);
api.delete(
  '/delete-book/:idBook',
  md_auth.ensureAuth,
  BookController.deleteBook
);
api.get('/search-book-title', BookController.searchTitle);
api.get('/search-book-keywords', BookController.searchKeywords);
api.get('/lend-book/:idBook', md_auth.ensureAuth, BookController.lendBook);
api.get('/return-book/:idBook', md_auth.ensureAuth, BookController.returnBook);
api.get(
  '/get-books-avaible',
  md_auth.ensureAuth,
  BookController.getBooksAviablesUser
);
api.get('/get-books-lend', md_auth.ensureAuth, BookController.getBooksLendUser);
api.get(
  '/get-count-books-lend-porcentaje',
  md_auth.ensureAuth,
  BookController.getBoookCoutnLendProcentaje
);
api.get(
  '/get-count-books-lend',
  md_auth.ensureAuth,
  BookController.getBoookCoutnLend
);

module.exports = api;
