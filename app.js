var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    fs = require('file-system'),

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

app.post('/api/file-upload', function(req, res) {
    // get the temporary location of the file
    var tmp_path = req.files.thumbnail.path;
    // set where the file should actually exists - in this case it is in the "images" directory
    var target_path = './public/images/' + req.files.thumbnail.name;
    // move the file from the temporary location to the intended location
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
        });
    });
};
app.use('/api/books', bookRouter);
app.use('/api/users', userRouter);

app.get('/', function(req, res){
    res.send('Welcome!')
});

app.listen(port, function(){
    console.log('Api is alive on port '+ port)
});

module.exports = app;