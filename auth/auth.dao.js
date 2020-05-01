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

const authModel = mongoose.model('Users', authSchema);
module.exports = authModel;