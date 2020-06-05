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
  },
  domicilio: {
    type: String,
    trim: true
  },
  telefono: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});


const tabla = new Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuario'
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  dia: [
    {
      ejercicio: [
        {
          nombre: {
            type: String,
            required: true,
            trim: true
          },
          repeticiones: {
            type: String,
            required: true,
            trim: true
          },
          pesoMax: {
            type: String,
            trim: true
          }
        }
      ]
    }
  ]
}, {
  timestamps: true
});

const ejercicio = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  zona: {
    type: String,
    required: true,
    trim: true
  },
  explicacion: {
    type: String,
    required: true,
    trim: true
  },
  consejos: {
    type: String,
    trim: true
  },
  imagen: {
    type: String,
    trim: true
  },
  video: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});


usuario.statics = {}

const modeloUsuario = mongoose.model('Usuarios', usuario);
const modeloTabla = mongoose.model('Tablas', tabla);
const modeloEjercicios = mongoose.model('Ejercicios', ejercicio);


module.exports = {
  modeloUsuario,
  modeloTabla,
  modeloEjercicios
}