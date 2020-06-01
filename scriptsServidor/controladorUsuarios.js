const modelos = require('./modelosEsquemas');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.registrarUsuario = (req, res) => {
  // Recogemos datos recibidos y creamos nuevo usuario
  const nuevoUsuario = {
    nombre: req.body.nombre,
    dni: req.body.dni,
    password: bcrypt.hashSync(req.body.password),
    acceso: req.body.acceso
  }

  modelos.modeloUsuario.create(nuevoUsuario, (err, user, next) => {
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
  modelos.modeloUsuario.findOne({ dni: datosUsuario.dni }, (err, user) => {
    if (err) return res.status(500).send('Error en el servidor');
    if (!user) {
      // Error si el dni no existe
      res.status(409).send({ message: 'DNI no existe' });
    } else {

      // Comparamos la contraseña introducida con la de la base de datos
      const resultPassword = bcrypt.compareSync(datosUsuario.password, user.password);
      if (resultPassword) {

        //Creamos token de acceso
        const expiresIn = 30 * 60;
        const accessToken = jwt.sign({
          id: user.id,
          nombre: user.nombre,
          dni: user.dni,
          acceso: user.acceso
        }, SECRET_KEY, { expiresIn: expiresIn });

        // Datos que devolvemos en la llamada 
        const datosUsuario = {
          id: user.id,
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

// Buscamos todos los usuarios que no tengan nivel de acceso 1 (admin) y enviamos nombre ( _id se manda automatico)
exports.listarUsuarios = (req, res) => {
  modelos.modeloUsuario.find({ acceso: { $ne: "1" } }, { "nombre": 1 }, (err, usuarios) => {
    if (err) return res.status(500).send('Error en el servidor');
    //Enviamos usuarios que nos ha devuelto la bd
    res.send({ usuarios });
  });
}

// Buscamos todos los usuarios que tengan el nivel que nos llega desde el front. El nivel habra que mandarle en formato { "acceso" : [1,3,4] }
exports.listarUsuariosFiltrarNivel = (req, res) => {
  const acceso = req.body.acceso;
  modelos.modeloUsuario.find({ acceso: { $in: acceso } }, { "nombre": 1 }, (err, usuarios) => {
    if (err) return res.status(500).send('Error en el servidor');
    //Enviamos usuarios que nos ha devuelto la bd
    res.send({ usuarios });
  });
}
