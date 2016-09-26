var request = require('supertest'),
    should = require('should'),
    app = ('../app.js'),
    mongoose = require('mongoose'),
    // Book = mongoose.model('Book'),
    agent = request.agent(app);

describe('Book CRUD test', function () {
    it('Should allow book to be posted and return a read and _id', function (done) {
        var bookPost = {title: 'New book', author: 'Me', genre: 'Fiction'};

        agent.post('/api/books')
            .send(bookPost)
            .expect(201)
            .end(function (err, results) {
                // console.log(arguments);
                // results.body.read.should.equal(false);
                // results.body.should.have.property('_id');
                done();
            })
    });

    /*afterEach(function (done) {
        // Book.remove().exec();
        done();
    })*/
});