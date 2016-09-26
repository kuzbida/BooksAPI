var express = require('express'),
    Book = require('../models/bookModel'),
    _ = require('underscore-node'),
    bookRouter = express.Router();

var routes = function(){

    var bookController = require('../controllers/bookController')(Book);

    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.get);

    bookRouter.use('/:bookId', function (req, res, next) {
        Book.findById(req.params.bookId, function(err, book){
            if(err){
                res.status(500).send(err);
            } else if(book) {
                req.book = book;
                next();
            } else {
                res.status(404).send('Book not found')
            }
        });

    });

    bookRouter.route('/:bookId')
        .get(function(req, res){
            res.json(req.book);
        })
        .put(function(req, res){
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.save();
            res.json(req.book);
        })
        .patch(function (req, res) {
            var newBook = _.pick(req.body, 'title', 'author', 'genre', 'read');
            _.extend(req.book, newBook);
            req.book.save(function (err) {
                if(err){
                    res.status(500).send(err);
                } else {
                    res.json(req.book);
                }
            });
        })
        .delete(function(req, res){
            req.book.remove(function (err) {
                if(err){
                    res.status(500).send(err);
                } else {
                    res.status(204).send('Removed');
                }
            })
        });

    return bookRouter;
};

module.exports = routes();
