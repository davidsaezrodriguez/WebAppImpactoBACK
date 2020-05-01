const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.createUser = (req, res) => {
  const newUser = {
    dni: req.body.dni,
    nombre: req.body.nombre,
    password: bcrypt.hashSync(req.body.password),
    acceso: req.body.acceso
  }

  User.create(newUser, (err, user) => {
    if (err && err.code === 11000) return res.status(409).send('DNI ya existe');
    if (err) return res.status(500).send('Server error');
    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({ id: user.id },
      SECRET_KEY, {
        expiresIn: expiresIn
      });
    const dataUser = {
      dni: user.dni,
      nombre: user.nombre,
      accessToken: accessToken,
      expiresIn: expiresIn
    }
    // response 
    res.send({ dataUser });
  });
}

exports.loginUser = (req, res) => {
  const userData = {
    dni: req.body.dni,
    password: req.body.password
  }
  User.findOne({ dni: userData.dni }, (err, user) => {
    if (err) return res.status(500).send('Server error!');

    if (!user) {
      // dni no existe
      res.status(409).send({ message: 'DNI no existe' });
    } else {
      const resultPassword = bcrypt.compareSync(userData.password, user.password);
      if (resultPassword) {
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });

        const dataUser = {
          name: user.name,
          email: user.email,
          accessToken: accessToken,
          expiresIn: expiresIn
        }
        res.send({ dataUser });
      } else {
        // password incorecta
        res.status(409).send({ message: 'Password incorrecta' });
      }
    }
  });
}

