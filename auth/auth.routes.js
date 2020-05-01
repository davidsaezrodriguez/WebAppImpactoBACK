const User = require('./auth.controller');

module.exports = (router) => {
    router.post('/register', function (req, res) {
        User.createUser(req,res);
    });
    router.post('/login',function (req, res) {
        User.loginUser(req,res);
    });
}