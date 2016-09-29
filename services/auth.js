var bcrypt = require('bcryptjs'),
    User = require('../models/userModel'),
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
            console.log('user.password', user.password);
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if(err){
                    res.status(500);
                    req.send(err);
                } else if(result === true){
                    console.log(result);
                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign({user_id: user._id}, secretKey);

                    // return the information including token as JSON
                    res.json({
                        token: token
                    });
                } else {
                    res.status(400).json({ success: false, message: 'Authentication failed. Wrong password.' });
                }

            });
        }
    });
}

function checkToken(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, secretKey, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                console.log(decoded);
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
}

var auth = {
    token: token,
    checkToken: checkToken
};

module.exports = auth;