const funciones = require('./funciones');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.crearUsuario = (req, res) => {
  // Recogemos datos recibidos y creamos nuevo usuario
  const nuevoUsuario = {
    nombre: req.body.nombre,
    dni: req.body.dni,
    password: bcrypt.hashSync(req.body.password),
    acceso: req.body.acceso
  }

  funciones.modeloUsuario.create(nuevoUsuario, (err, user, next) => {
    // Posibles errores
    if (err && err.code === 11000) return res.status(409).send('DNI ya existe');
    if (err) return res.status(500).send('Error en el servidor');

    //Creamos token de acceso
    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });

    // Datos que mostramos en pantalla 
    const datosUsuario = {
      nombre: user.nombre,
      dni: user.dni,
      accessToken: accessToken,
      expiresIn: expiresIn,
      acceso: user.acceso
    }
    res.send({ datosUsuario });
  });
}

exports.loginUsuario = (req, res) => {
  // Recogemos datos recibidos 
  const datosUsuario = {
    dni: req.body.dni,
    password: req.body.password
  }

  // Buscamos el usuario en la base de datos
  funciones.modeloUsuario.findOne({ dni: datosUsuario.dni }, (err, user) => {
    if (err) return res.status(500).send('Error en el servidor');
    if (!user) {
      // Error si el dni no existe
      res.status(409).send({ message: 'DNI no existe' });
    } else {
      
      // Comparamos la contraseña introducida con la de la base de datos
      const resultPassword = bcrypt.compareSync(datosUsuario.password, user.password);
      if (resultPassword) {

        //Creamos token de acceso
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });

        // Datos que mostramos en pantalla 
        const datosUsuario = {
          name: user.name,
          email: user.email,
          accessToken: accessToken,
          expiresIn: expiresIn
        }
        res.send({ datosUsuario });

      } else {
        // Error si la contraseña es incorecta
        res.status(409).send({ message: 'La contraseña es incorrecta' });
      }
    }
  });
}

