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

const dieta = new Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuario'
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  comida: [
    {
      alimento: [
        {
          nombre: {
            type: String,
            required: true,
            trim: true
          },
          cantidad: {
            type: String,
            required: true,
            trim: true
          },
          kcal: {
            type: Number,
            trim: true
          }
        }
      ]
    }
  ],
  kcalTotal: {
    type: Number,
    trim: true
  }
}, {
  timestamps: true
});

const seguimiento = new Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuario'
  },
  indice: [
    {
      fecha: {
        type: Date,
        required: true,
        trim: true
      },
      peso: {
        type: Number,
        required: true,
        trim: true
      },
      altura: {
        type: Number,
        required: true,
        trim: true
      },
      imc: {
        type: Number,
        required: true,
        trim: true
      },
      grasa: {
        type: Number,
        trim: true
      }
    }
  ],
  medida: [
    {
      fecha: {
        type: Date,
        required: true,
        trim: true
      },
      biceps: {
        type: Number,
        trim: true
      },
      hombros: {
        type: Number,
        trim: true
      },
      pecho: {
        type: Number,
        trim: true
      },
      cintura: {
        type: Number,
        trim: true
      },
      gluteo: {
        type: Number,
        trim: true
      },
      muslo: {
        type: Number,
        trim: true
      }
    }
  ]

}, {
  timestamps: true
});

const clase = new Schema({
  tipo: {
    type: String,
    required: true,
    trim: true
  },
  inicio: {
    type: Date,
    required: true,
    trim: true
  },
  fin: {
    type: Date,
    required: true,
    trim: true
  },
  color: {
    primary: { type: String },
    secondary: { type: String }
  },
  maxAlumnos: {
    type: Number,
    trim: true
  },
  alumnos: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId,  ref: 'usuario._id' },
      nombre: { type: String, ref: 'usuario.nombre' }
    }
  ]
}, {
  timestamps: true
});

usuario.statics = {}

const modeloUsuario = mongoose.model('Usuarios', usuario);
const modeloTabla = mongoose.model('Tablas', tabla);
const modeloEjercicios = mongoose.model('Ejercicios', ejercicio);
const modeloDieta = mongoose.model('Dietas', dieta);
const modeloSeguimiento = mongoose.model('Seguimientos', seguimiento);
const modeloClase = mongoose.model('Clases', clase);




module.exports = {
  modeloUsuario,
  modeloTabla,
  modeloEjercicios,
  modeloDieta,
  modeloSeguimiento,
  modeloClase
}