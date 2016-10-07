var express = require('express'),
    _ = require('underscore-node'),
    exerciseRouter = express.Router(),

    multer  = require('multer'),

    storage = multer.diskStorage({ //multers disk storage settings
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
    }).single('file');

var routes = function(Exercise){
    
    // var userController = require('../controllers/userController')(User);

    exerciseRouter.route('/')
        .get(function get(req, res){
            var query = _.pick(req.query || {}, 'name');
            Exercise.find(query, function(err, Exercises){
                if(err){
                    res.status(500).send(err);
                } else {
                    res.json(Exercises);
                }
            });
        })
        .post(function (req, res) {
            upload(req, res, function(err){
                console.log(req);
                if(err){
                    res.json({error_code:1,err_desc:err});
                    return;
                }
                var data = {
                    name: req.body.name,
                    description: req.body.description,
                    url: req.file.path
                }
                var exercise = new Exercise(data);
                exercise.save(function () {
                    res.status(201);
                    res.json(exercise);
                });
            });
        });


    return exerciseRouter;
};

module.exports = routes;
