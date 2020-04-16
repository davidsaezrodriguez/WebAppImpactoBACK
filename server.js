// Import configuration 
var config = require('./config.json'); 
// Express 
var express = require('express'); 
// Serve-Static 
var serveStatic = require('serve-static'); 
// Body-Parser 
var bodyParser = require('body-parser'); 
// Multer 
var multer = require('multer'); 
// PostgreSQL 
var massive = require("massive"); 

var massiveInstance = massive.connectSync({connectionString : connectionString});
var db;