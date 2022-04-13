const Author = require('../models/author.model');

const readAllAuthors = (request, response) => {
    Author.find()
        .then(allAuthors => response.status(200).json(allAuthors))
        .catch(err => {
            response.statusMessage = `Hubo un error al ejecutar la búsqueda: ${err}`;
            return response.status(400).end();
        });
}

const readOneSingleAuthor = (request, response) => {
    Author.findOne({_id: request.params.id})
        .then(oneSingleAuthor => response.status(200).json(oneSingleAuthor))
        .catch(err => {
            response.statusMessage = `Hubo un error al ejecutar la búsqueda: ${err}`;
            return response.status(400).end();
        });
}

const createAuthor = (request, response) => {
    Author.create(request.body)
        .then(createdAuthor => response.status(201).json(createdAuthor))
        .catch(err => {
            response.statusMessage = `Hubo un error al ejecutar el insert: ${err}`;
            return response.status(400).json(err);
        });
}

const updateExistingAuthor = (request, response) => {
    const options = {new: true, runValidators: true}
    Author.findOneAndUpdate({_id: request.params.id}, {$set: request.body}, options)
        .then(updatedAuthor => response.status(202).json(updatedAuthor))
        .catch(err => {
            response.statusMessage = `Hubo un error al ejecutar la actualización: ${err}`;
            return response.status(400).json(err);
        });
}

const deleteAnExistingAuthor = (request, response) => {
    Author.deleteOne({_id: request.params.id})
        .then(result => response.status(204).json(result))
        .catch(err => {
            response.statusMessage = `Hubo un error al ejecutar la eliminación: ${err}`;
            return response.status(400).end();
        });
}

const AuthorController = {
    readAllAuthors,
    readOneSingleAuthor,
    createAuthor,
    updateExistingAuthor,
    deleteAnExistingAuthor
}

module.exports = AuthorController;
