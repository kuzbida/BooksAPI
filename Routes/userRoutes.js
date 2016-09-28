var express = require('express'),
    _ = require('underscore-node'),
    userRouter = express.Router();

var routes = function(User){
    
    var userController = require('../controllers/userController')(User);

    userRouter.route('/')
        .get(userController.get)
        .post(userController.post);

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
