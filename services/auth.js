var User = require('../models/userModel'),
    jwt    = require('jsonwebtoken'),
    config = require('../config'),
    secretKey = config.secret;


function token(req, res){
    // find the user
    User.findOne({
        name: req.body.name
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, secretKey);

                // return the information including token as JSON
                res.json({
                    token: token
                });
            }

        }

    });
}

var auth = {
    token: token
};

module.exports = auth;