const Users = require('./auth.controller');
module.exports = (router) => {
    router.post('/register', Users.createUser);
    route.post('login', Users.loginUser)
}