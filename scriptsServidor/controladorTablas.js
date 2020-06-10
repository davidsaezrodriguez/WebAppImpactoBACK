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
        res.send(tabla);
    });
}

exports.listarTablasUsuario = (req, res) => {
    // Recogemos idUsuario recibido
    const idUsuario = req.body.idUsuario;
    modelos.modeloTabla.find({ usuario: idUsuario }).sort([['updatedAt', -1]]).exec(function (err, tablas) {
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

exports.actualizarPeso = (req, res) => {
    // Recogemos el array de cambios que recibimos del front
    const arrayCambiosPesosMax = req.body;
    // Recorremos el array cogiendo las variables nacesarias y vamos cambiando el pesoMax ejercicio a ejercicio
    for (i = 0; i < arrayCambiosPesosMax.length; i++) {
        const idTabla = arrayCambiosPesosMax[i].idTabla;
        const idDia = arrayCambiosPesosMax[i].idDia;
        const idEjercicio = arrayCambiosPesosMax[i].idEjercicio;
        const pesoMax = arrayCambiosPesosMax[i].pesoMax;
        modelos.modeloTabla.update({ "_id": { $eq: idTabla } },
            { $set: { "dia.$[d].ejercicio.$[ejer].pesoMax": pesoMax } },
            { arrayFilters: [{ "d._id": { $eq: idDia } }, { "ejer._id": { $eq: idEjercicio } }] }, (err, ejercicio) => {
                if (err) return res.status(500).send('Error en el servidor');
            });
    }
}

exports.eliminarTabla = (req, res) => {
    // Recogemos idTabla recibido
    const idTabla = req.body.idTabla;
    modelos.modeloTabla.deleteOne({ _id: idTabla }, (err, tabla) => {
        if (err) return res.status(500).send('Error en el servidor');
        res.send({ tabla });
    });
}
