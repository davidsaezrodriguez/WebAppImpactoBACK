const Users = require('./auth.controller');

module.exports = (router) => {
    router.post('/register', function (req, res) {
        Users.createUser(req,res);
    });
    router.post('/login',function (req, res) {
        Users.loginUser(req,res);
    });
}