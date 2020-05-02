'use strict'
const cors = require('cors');
const authRoutes = require('./auth/auth.routes');
const express = require('express');
const bodyParser = require('body-parser');
const propierties = require('./config/properties');
const DB = require('./config/db');
// init DB
DB();

const app = express();
const router = express.Router();

// Con body parser transformamos la respuesta post en json y para asi poder coger variable: valor eon rea.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/api', router);

authRoutes(router);
router.get('/', (req, res) => {
  res.send('Pagina de inicio');
});
app.use(router);
app.listen(propierties.PORT, () => console.log(`Server runing on port ${propierties.PORT}`));