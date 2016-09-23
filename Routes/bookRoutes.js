var express = require('express'),
    Book = require('./models/bookModel'),
    bookRouter = express.Router();

var routes = function(){

    bookRouter.route('/')
        .get(function(req, res){
            var responseJson = {hello: "What do you want?"};
            res.json(responseJson);
        });

    bookRouter.route('/books')
        .post(function (req, res) {
            var book = new Book(req.body);
            book.save();
            console.log(book);

            res.send(book)
        })
        .get(function(req, res){
            var query = _.pick(req.query || {}, 'title', 'genre', 'author');
            console.log(query);
            Book.find(query, function(err, books){
                if(err){
                    res.status(500).send(err);
                } else {
                    res.json(books);}
            });
        });

    bookRouter.route('/books/:bookId')
        .get(function(req, res){
            Book.findById(req.bookId, function(err, book){
                if(err){
                    res.status(500).send(err);
                } else {
                    res.json(book);}
            });
        });

    return bookRouter;
};

module.exports = routes;
