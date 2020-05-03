const mongoose = require('mongoose');
const dbURL = require('./properties').DB;

// Hacemos la conexion con la base de datos
module.exports = () => {
  mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Conexion con la base de datos mongodb --> ${dbURL}`))
    .catch(err => console.log(`Error en la conexion con la base de datos ${err}`))

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(`Desconexion de mongoDB`);
      process.exit(0)
    });
  });
}