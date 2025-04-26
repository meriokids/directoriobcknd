// src/models/Client.js
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true
  },
  puesto: {
    type: String,
    required: true
  },
  empresa: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Client', clientSchema);
