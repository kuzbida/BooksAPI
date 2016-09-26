var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    bookRouter = require('./Routes/bookRoutes');

var db = mongoose.connect('mongodb://localhost/bookAPI');

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