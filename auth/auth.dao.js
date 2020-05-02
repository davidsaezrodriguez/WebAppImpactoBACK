const mongoose = require('mongoose');
const authSchema = require('./auth.model');

authSchema.statics = {
  // Recibe los datos "data" con los que creamos el usuario y usamos la respuesta "cb" para guardar el usuario
  create: function (data, cb) {
    const user = new this(data);
    user.save(cb);
  },
  login: function (query, cb) {
    this.find(query, cb);
  }
}
//Usuarios es el nombre de la coleccion 
const authModel = mongoose.model('Usuarios', authSchema);
module.exports = authModel;