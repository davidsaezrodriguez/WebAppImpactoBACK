const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const usuario = new Schema({
  dni: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  acceso: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});


const tabla = new Schema({
  dia: {
    ejercicio: {
      nombre: {
        type: String,
        required: true,
        trim: true
      },
        repeticiones: {
        type: String,
        required: true,
        trim: true
      }
    }
  }
}, {
  timestamps: true
});

usuario.statics={}

const modeloUsuario = mongoose.model('Usuarios', usuario);
const modeloTabla = mongoose.model('Tablas', tabla);

module.exports =  {
  modeloUsuario,
  modeloTabla
}