const _ = require('lodash');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'claveGimnasioImpacto2020';

// Comprobamos que el token que nos manda el front es correcto para el acceso a esta api y si es que si dejamos continuar con operacion
module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).send('Error - No se mando authorization');

  const token = _.replace(authHeader, 'Bearer', '').trim();
  if (!token) return res.status(401).send('Error - Solo bearer no hay token');
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send('Error- Token expirado o invalido');
  }
};