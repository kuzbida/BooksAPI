var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),

    //services
    auth    = require('./services/auth'),
    //models
    User = require('./models/userModel'),
    Book = require('./models/bookModel'),

    //routes
    bookRouter = require('./Routes/bookRoutes')(Book);
    userRouter = require('./Routes/userRoutes')(User);

var db;
if(process.env.ENV === 'Test' && false) {
    db = mongoose.connect('mongodb://localhost/bookAPI_test');
} else {
    db = mongoose.connect('mongodb://localhost/bookAPI');
}

var port = process.env.PORT || 3333;

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// use morgan to log requests to the console
app.use(morgan('dev'));

app.post('/api/token', auth.token);

//check token before secure endpoints
app.use(auth.checkToken);

app.use('/api/books', bookRouter);
app.use('/api/users', userRouter);

app.get('/', function(req, res){
    res.send('Welcome!')
});

app.listen(port, function(){
    console.log('Api is alive on port '+ port)
});

module.exports = app;