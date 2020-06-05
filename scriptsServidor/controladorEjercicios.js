const modelos = require('./modelosEsquemas');

// Creamos nuevo ejercicio en bbdd
exports.crearEjercicio = (req, res) => {
    // Recogemos datos recibidos y creamos nuevo ejercicio
    const nuevoEjercicio = req.body.ejercicio;
    modelos.modeloEjercicios.create(nuevoEjercicio, (err, ejercicio, next) => {
        // Posibles errores
        if (err) return res.send({ err })
        if (err) return res.status(500).send('Error en el servidor');
        
        res.send(ejercicio);
    });
}

// Listamos ejercicios filtrados por la zona que pertenecen
exports.listarEjerciciosZona = (req, res) => {
    // Recogemos la zona de la que tenemos que buscar los ejercicios
    const zona = req.body.zona;
    modelos.modeloEjercicios.find({ zona }, (err, ejercicios) => {
        if (err) return res.status(500).send('Error en el servidor');
        //Enviamos ejercicios de la zona buscada
        res.send( ejercicios );
    });
}

// Buscamos ejercicio en la bbdd
exports.buscarEjercicio = (req, res) => {
    // Recogemos id del ejercicio a buscar
    const idEjercicio = req.body.idEjercicio;
    modelos.modeloEjercicios.find({ _id : idEjercicio }, (err, ejercicio) => {
        if (err) return res.status(500).send('Error en el servidor');
        //Enviamos ejercicios de la zona buscada
        res.send( ejercicio );
    });
}