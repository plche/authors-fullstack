const express = require('express');
const AuthorRouter = express.Router();
const AuthorController = require('../controllers/author.controller');

AuthorRouter.get('/read/all', AuthorController.readAllAuthors);
AuthorRouter.get('/read/:id', AuthorController.readOneSingleAuthor);
AuthorRouter.post('/create', AuthorController.createAuthor);
AuthorRouter.put('/update/:id', AuthorController.updateExistingAuthor);
AuthorRouter.delete('/delete/:id', AuthorController.deleteAnExistingAuthor);

module.exports = AuthorRouter;
