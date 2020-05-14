'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const propiedades = require('./configuracionConexionDB/properties');
const rutas = require('./scriptsServidor/rutas');
const DB = require('./configuracionConexionDB/db');

// Realizamos conexion con base de datos
DB();

// Inicializamos la app express 
const app = express();

// Con body parser transformamos la respuesta post en json y para asi poder coger variable: valor eon rea.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Inicializamos las rutas 
const router = express.Router();

rutas(router);
app.use(router);

// Indicamos a la app express que puerto tiene que escuchar
app.listen(propiedades.PUERTO, () => console.log(`Servidor funcionando en puerto ${propiedades.PUERTO}`));