const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'llavesecreta123456';

exports.createUser = (req, res, next) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }

    User.create(newUser, (err, user) => {
        if (err) return res.status(500).send('Server error');
        const expireIn = 24 * 60 * 60;
        const accesToken = jwt.sign({ id: user.id },
            SECRET_KEY, {
            expiresIn: expireIn
        });
        //response
        res.send({ user });
    });
}

exports.loginUser = (req, res, next) => {
    const userData = {
        email: red.body.email,
        password: req.body.password
    }
    User.findOne({ email: userData.email}, (err,user)=>{
        if (err) return res.status(500).send('Server error');
        if (!user){
            // email no existe
            res.status(409).send({message: 'Algo fue mal'});
        }else{
            const resultPassword = userData.password;
            if(resultPassword){
                const expireIn = 14*60*60;
                const accesToken = jwt.sign({id: user.id}, SECRET_KEY, { expireIn: expiresIn});
                res.send({userData});
            }else{
                // contraseña incorrecta
                res.status(409).send({message: 'Algo fue mal'});
            }
        }
    })
}