var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    _ = require('underscore-node');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var app = express();

var port = process.env.PORT || 3333;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var bookRouter = require('./Routes/bookRoutes');


app.use('/api', bookRouter);

app.get('/',function(req, res){
    res.send('Welcome!')
});

app.listen(port, function(){
    console.log('Api is alive on port '+ port)
});