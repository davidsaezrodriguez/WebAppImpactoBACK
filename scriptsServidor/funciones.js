const mongoose = require('mongoose');
const esquemas = require('./modelosEsquemas');

// Creamos las funciones para el esquema de usuarios
esquemas.usuario.statics = {
  // Recibe los datos "data" con los que creamos el usuario y usamos la respuesta "cb" para guardar el usuario
  create: function (data, cb) {
    const user = new this(data);
    user.save(cb);
  },
  login: function (query, cb) {
    this.find(query, cb);
  }
}

// Creamos los modelos para nuestra base de datos con los esquemas de cada uno
const modeloUsuario = mongoose.model('Usuarios', esquemas.usuario);
const modeloTabla = mongoose.model('Tablas', esquemas.tabla);

module.exports ={
  modeloUsuario,
  modeloTabla
} 