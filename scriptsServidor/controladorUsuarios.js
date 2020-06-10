const modelos = require('./modelosEsquemas');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'claveGimnasioImpacto2020';

exports.registrarUsuario = (req, res) => {
  // Recogemos datos recibidos y creamos nuevo usuario
  const nuevoUsuario = {
    nombre: req.body.nombre,
    dni: req.body.dni,
    password: bcrypt.hashSync(req.body.password),
    acceso: req.body.acceso,
    domicilio: req.body.domicilio,
    telefono: req.body.telefono
  }
  modelos.modeloUsuario.create(nuevoUsuario, (err, user, next) => {
    // Posibles errores
    if (err && err.code === 409) return res.status(409).send('DNI ya existe');
    if (err) return res.status(500).send('Error en el servidor');
    return res.send(user);
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
      res.status(404).send({ message: 'DNI no existe' });
    } else {

      // Comparamos la contraseña introducida con la de la base de datos
      const resultPassword = bcrypt.compareSync(datosUsuario.password, user.password);
      if (resultPassword) {

        //Creamos token de acceso
        const expiresIn = 120 * 60;
        const accessToken = jwt.sign({
          id: user.id,
          nombre: user.nombre,
          dni: user.dni,
          acceso: user.acceso
        }, SECRET_KEY, { expiresIn: expiresIn });

        // Si el usuario se logeo devolvemos el token en la llamada

        res.send({ accessToken });

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

// Buscamos un usuario y devovemos sus datos
exports.buscarUsuario = (req, res) => {
  const idUsuario = req.body.idUsuario;
  modelos.modeloUsuario.findOne({ _id: idUsuario }, (err, usuario) => {
    if (err) return res.status(500).send('Error en el servidor');
    //Enviamos usuario que nos ha devuelto la bd
    res.send({ usuario });
  });
}

// Cambiamos contraseña 
exports.cambiarContrasena = (req, res) => {
  const idUsuario = req.body.idUsuario;
  const contraVieja = req.body.contraVieja;
  const contraNueva = bcrypt.hashSync(req.body.contraNueva);

  modelos.modeloUsuario.findOne({ _id: idUsuario }, (err, usuario) => {
    if (err) return res.status(404).send('Error con usuario');
    // Comparamos la contraseña introducida con la de la base de datos
    const resultPassword = bcrypt.compareSync(contraVieja, usuario.password);
    if (resultPassword) {
      // Si el usuario la contraseña es correcta, ahora la cambiamos por la nueva
      modelos.modeloUsuario.update({ "_id": { $eq: idUsuario } },
        { password: contraNueva }, (err, usuario) => {
          if (err) return res.status(500).send('Error en el servidor');
          res.send({ usuario });
        });
    } else {
      // Error si la contraseña es incorecta
      res.status(409).send({ message: 'La contraseña es incorrecta' });
    }
  });
}


// Modificamos datos del usuario 
exports.modificarDatosUsuario = (req, res) => {
  const usuarioActualizar = {
    idUsuario: req.body.id,
    nombre: req.body.nombre,
    dni: req.body.dni,
    acceso: req.body.acceso,
    domicilio: req.body.domicilio,
    telefono: req.body.telefono
  }

  modelos.modeloUsuario.update({ "_id": { $eq: usuarioActualizar.idUsuario } },
    { nombre: usuarioActualizar.nombre, dni: usuarioActualizar.dni, acceso: usuarioActualizar.acceso,
       domicilio: usuarioActualizar.domicilio, telefono: usuarioActualizar.telefono }, (err, usuario) => {
      if (err) return res.status(500).send('Error en el servidor');
      res.send({ usuario });
    })
}

exports.eliminarUsuario = (req, res) => {
  // Recogemos idUsuario recibido
  const idUsuario = req.body.idUsuario;
  modelos.modeloUsuario.deleteOne({ _id: idUsuario }, (err, usuario) => {
      if (err) return res.status(500).send('Error en el servidor');
      res.send({ usuario });
  });
}



