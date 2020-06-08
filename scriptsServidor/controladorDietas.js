const modelos = require('./modelosEsquemas');

exports.crearDieta = (req, res) => {
    // Recogemos datos recibidos y creamos nueva dieta
    const nuevaDieta = req.body.dieta;
    modelos.modeloDieta.create(nuevaDieta, (err, tabla, next) => {
        // Posibles errores
        if (err) return res.status(500).send('Error en el servidor');
        if (err) return res.send({ err })
        res.send(tabla);
    });
}

exports.listarDietasUsuario = (req, res) => {
    // Recogemos idUsuario recibido
    const idUsuario = req.body.idUsuario;
    modelos.modeloDieta.find({ usuario: idUsuario }, (err, dietas) => {
        if (err) return res.status(500).send('Error en el servidor');
        //Enviamos dietas del usuario que nos ha devuelto la bd
        res.send({ dietas });
    });
}
exports.buscarDieta = (req, res) => {
    // Recogemos idDieta recibido
    const idDieta = req.body.idDieta;
    modelos.modeloDieta.find({ _id: idDieta }, (err, dieta) => {
        if (err) return res.status(500).send('Error en el servidor');
        //Enviamos dietas del usuario que nos ha devuelto la bd
        res.send({ dieta });
    });
}

exports.eliminarDieta = (req, res) => {
    // Recogemos idDieta recibido
    const idDieta = req.body.idDieta;
    modelos.modeloDieta.deleteOne({ _id: idDieta }, (err, dieta) => {
        if (err) return res.status(500).send('Error en el servidor');
        res.send({ dieta });
    });
}
