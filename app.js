var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    Book = require('./models/bookModel'),
    bookRouter = require('./Routes/bookRoutes')(Book);

var db;
console.log('___env', process.env.ENV);
if(process.env.ENV === 'Test' && false) {
    db = mongoose.connect('mongodb://localhost/bookAPI_test');
} else {
    db = mongoose.connect('mongodb://localhost/bookAPI');
}

var app = express();

var port = process.env.PORT || 3333;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/api/books', bookRouter);

app.get('/',function(req, res){
    res.send('Welcome!')
});

app.listen(port, function(){
    console.log('Api is alive on port '+ port)
});

module.exports = app;