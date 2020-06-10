const modelos = require('./modelosEsquemas');

exports.crearSeguimiento = (req, res) => {
    // Recogemos datos recibidos y creamos nuevo seguimiento
    const seguimiento = {
        usuario: req.body.idUsuario,
        indice: [],
        medida: [],
    }
    modelos.modeloSeguimiento.create(seguimiento, (err, seguimiento, next) => {
        // Posibles errores
        if (err) return res.status(500).send('Error en el servidor');
        if (err) return res.send({ err })
        res.send(seguimiento);
    });
}

exports.buscarSeguimiento = (req, res) => {
    // Recogemos idUsuario recibido
    const idUsuario = req.body.idUsuario;
    modelos.modeloSeguimiento.findOne({ usuario: idUsuario }, (err, seguimiento) => {
        if (err) return res.status(500).send('Error en el servidor');
        //Enviamos seguimiento del usuario que nos ha devuelto la bd
        // Creamos un nuevo objeto donde invertimos los array para mostrarlos de mas nuevo a mas antiguo
        const seguimientoFormateado = {
            _id : seguimiento._id,
            usuario: seguimiento.usuario,
            indice: seguimiento.indice.reverse(),
            medida: seguimiento.medida.reverse()
        };
        res.send(seguimientoFormateado);
    });
}

exports.guardarIndice = (req, res) => {
    // Recogemos seguimiento del que guardaremos un nuevo indice
    const seguimiento = req.body.seguimiento;
    // Añadimos indice al seguimiento indicado
    modelos.modeloSeguimiento.update({ usuario: seguimiento.usuario },
        { $push: { indice: seguimiento.indice } }, (err, seguimiento) => {
            if (err) return res.status(500).send('Error en el servidor');
            res.send({ seguimiento });
        });
}


exports.guardarMedidas = (req, res) => {
    // Recogemos seguimiento del que guardaremos unas nuevas medidas
    const seguimiento = req.body.seguimiento;
    // Añadimos medida al seguimiento indicado
    modelos.modeloSeguimiento.update({ usuario: seguimiento.usuario },
        { $push: { medida: seguimiento.medida } }, (err, seguimiento) => {
            if (err) return res.status(500).send('Error en el servidor');
            res.send({ seguimiento });
        });
}

exports.eliminarIndice = (req, res) => {
    // Recogemos idUsuario y idIndice recibido
    const idSeguimiento = req.body.idSeguimiento;
    const idIndice = req.body.idIndice
    modelos.modeloSeguimiento.update({ _id: idSeguimiento },
        { $pull: { indice: { _id: idIndice } } }, (err, seguimiento) => {
            if (err) return res.status(500).send('Error en el servidor');
            res.send({ seguimiento });
        });
}

exports.eliminarMedidas = (req, res) => {
    // Recogemos idUsuario y idMedida recibido
    const idSeguimiento = req.body.idSeguimiento;
    const idMedida = req.body.idMedida
    modelos.modeloSeguimiento.update({ _id: idSeguimiento },
        { $pull: { medida: { _id: idMedida } } }, (err, seguimiento) => {
            if (err) return res.status(500).send('Error en el servidor');
            res.send({ seguimiento });
        });
}
