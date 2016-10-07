var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    // multer  = require('multer'),
    db,
    port = process.env.PORT || 3333,

    //services
    auth    = require('./services/auth'),
    //models
    User = require('./models/userModel'),
    Book = require('./models/bookModel'),
    Exercise = require('./models/exerciseModel'),

    //routes
    bookRouter = require('./Routes/bookRoutes')(Book),
    userRouter = require('./Routes/userRoutes')(User),
    exerciseRouter = require('./Routes/exerciseRoutes')(Exercise);

    /*storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    }),
    upload = multer({
        storage: storage
    }).single('file');*/

if(process.env.ENV === 'Test' && false) {
    db = mongoose.connect('mongodb://localhost/bookAPI_test');
} else {
    db = mongoose.connect('mongodb://localhost/bookAPI');
}

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static('./client'));

/*app.post('/upload', function(req, res) {
    upload(req, res, function(err){
        console.log(req);
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }
        res.json({error_code:0,err_desc:null});
    });
});*/

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// use morgan to log requests to the console
app.use(morgan('dev'));

app.post('/api/token', auth.token);

//check token before secure endpoints
// app.use(auth.checkToken);

app.use('/api/books', bookRouter);
app.use('/api/users', userRouter);
app.use('/api/exercises', exerciseRouter);

app.listen(port, function(){
    console.log('Api is alive on port '+ port)
});

module.exports = app;