const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const userSchema = new Schema({
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

module.exports = userSchema;