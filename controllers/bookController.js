_ = require('underscore-node');

function bookController(Book){
    function post(req, res) {
        if(!req.body.title){
            res.status(400);
            res.send('Title is required')
        } else {
            var book = new Book(req.body);
            book.save(function () {
                res.status(201);
                res.send(book);
            });
        }
    }

    function get(req, res){
        var query = _.pick(req.query || {}, 'title', 'genre', 'author');
        Book.find(query, function(err, books){
            if(err){
                res.status(500).send(err);
            } else {
                res.json(books);
            }
        });
    }

    return {
        get: get,
        post: post
    }
}

module.exports = bookController;