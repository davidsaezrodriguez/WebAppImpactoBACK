const modelos = require('./modelosEsquemas');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkey123456';

exports.crearTabla = (req, res) => {
    // Recogemos datos recibidos y creamos nueva tabla
    const nuevaTabla = req.body.tabla;
    modelos.modeloTabla.create(nuevaTabla, (err, tabla, next) => {
        // Posibles errores
        if (err) return res.status(500).send('Error en el servidor');
        if (err) return res.send({ err })
        res.send({ tabla });
    });
}

exports.listarTablasUsuario = (req, res) => {
    // Recogemos idUsuario recibido
    const idUsuario = req.body.idUsuario;
    modelos.modeloTabla.find({ usuario: idUsuario }, (err, tablas) => {
        if (err) return res.status(500).send('Error en el servidor');
        //Enviamos tablas del usuario que nos ha devuelto la bd
        res.send({ tablas });
    });
}
exports.buscarTabla = (req, res) => {
    // Recogemos idTabla recibido
    const idTabla = req.body.idTabla;
    modelos.modeloTabla.find({ _id: idTabla }, (err, tabla) => {
        if (err) return res.status(500).send('Error en el servidor');
        //Enviamos tablas del usuario que nos ha devuelto la bd
        res.send({ tabla });
    });
}

