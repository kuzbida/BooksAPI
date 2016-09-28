var express = require('express'),
    _ = require('underscore-node'),
    userRouter = express.Router();

var routes = function(User){


    userRouter.route('/')
        .get(function(req, res){
            User.find({}, function(err, users) {
                res.json(users);
            });
        });

    userRouter.route('/setup')
        .get(function(req, res) {

            // create a sample user
            var nick = new User({
                name: 'Nick Cerminara',
                password: 'password',
                admin: true
            });

            // save the sample user
            nick.save(function(err) {
                if (err) throw err;

                console.log('User saved successfully');
                res.json({ success: true });
            });
        });


    return userRouter;
};

module.exports = routes;
