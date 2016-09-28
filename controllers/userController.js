var bcrypt = require('bcrypt');

function userController(User){

    function post(req, res) {
        if(!req.body.name || !req.body.password){
            res.status(400);
            res.send('Bad request')
        } else {
            var user = new User(req.body);
            user.save(function () {
                res.status(201);
                res.send(User);
            });
        }
    }

    function get(req, res){
        var query = _.pick(req.query || {}, 'name', 'admin');
        User.find(query, function(err, Users){
            if(err){
                res.status(500).send(err);
            } else {
                res.json(Users);
            }
        });
    }

    return {
        get: get,
        post: post
    }
}

module.exports = userController;