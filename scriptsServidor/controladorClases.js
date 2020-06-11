const modelos = require('./modelosEsquemas');


exports.crearClase = (req, res) => {
    // Recogemos datos recibidos y creamos nueva clase
    const nuevaClase = req.body.clase;
    modelos.modeloClase.create(nuevaClase, (err, clase, next) => {
        // Posibles errores
        if (err) return res.status(500).send('Error en el servidor');
        if (err) return res.send({ err })
        res.send(clase);
    });
}

exports.listarClases = (req, res) => {
    modelos.modeloClase.find().sort([['inicio', -1]]).exec(function (err, clases) {
        if (err) return res.status(500).send('Error en el servidor');
        //Enviamos tablas del usuario que nos ha devuelto la bd
        res.send(clases);
    });
}

exports.eliminarClase = (req, res) => {
    // Recogemos idClase recibido
    const idClase = req.body.idClase;
    modelos.modeloClase.deleteOne({ _id: idClase }, (err, clase) => {
        if (err) return res.status(500).send('Error en el servidor');
        res.send({ clase });
    });
}

exports.anadirAlumnoClase = (req, res) => {
    // Recogemos el id del usuario y de la clase para añadirlo a alumnos de esa clase
    const usuario = req.body.usuario;
    const idClase = req.body.idClase;

    // Primero buscamos la clase para comprobar si esta llena
    modelos.modeloClase.find({ _id: idClase }, (err, clase) => {
        const alumnosClase = clase[0].alumnos.length;
        const maxAlumnosClase = clase[0].maxAlumnos;

        // Comprobamos si puede apuntarse un alumno nuevo y si no indicamos que esta llena
        if (alumnosClase < maxAlumnosClase) {
            modelos.modeloClase.update({ "_id": { $eq: idClase } },
                { $push: { alumnos: usuario } }, (err, clase) => {
                    if (err) return res.status(500).send('Error en el servidor');
                    res.send({ clase });
                });
        } else {
            return res.status(500).send('Clase llena');
        }
    });
}

exports.eliminarAlumnoClase = (req, res) => {
    // Recogemos el id del usuario y de la clase para añadirlo a alumnos de esa clase
    const usuario = req.body.usuario;
    const idClase = req.body.idClase;

    modelos.modeloClase.update({ _id: idClase },{ '$pull': { 'alumnos': usuario } }, (err, clase) => {
        if (err) return res.status(500).send('Error en el servidor');
        res.send({ clase });

    });
}


exports.buscarClase = (req, res) => {
    // Recogemos idClase recibido
    const idClase = req.body.idClase;
    modelos.modeloClase.find({ _id: idClase }, (err, clase) => {
        if (err) return res.status(500).send('Error en el servidor');
        //Enviamos clase que nos ha devuelto la bd
        res.send({ clase });
    });
}


exports.listarClasesAsiste = (req, res) => {
    // Recogemos usuario recibido para buscar las clases en las que esta apuntado
    const usuario = req.body.usuario;

    modelos.modeloClase.find({ "alumnos": usuario }, (err, clasesAsiste) => {
        if (err) return res.status(500).send(err);
        //Enviamos clases a las que asiste el usuario que nos ha devuelto la bd
        res.send({ clasesAsiste });
    });
}

exports.listarClasesNoAsiste = (req, res) => {
    // Recogemos usuario recibido para buscar las clases en las que NO esta apuntado
    const usuario = req.body.usuario;

    modelos.modeloClase.find({ "alumnos": { $ne: usuario } }, (err, clases) => {
        if (err) return res.status(500).send(err);
        let clasesNoLlenas = [];
        let clasesLlenas = [];

        for (i = 0; i < clases.length; i++) {
            if (clases[i].maxAlumnos > clases[i].alumnos.length) {
                clasesNoLlenas.push(clases[i])
            } else {
                clasesLlenas.push(clases[i])
            }
        }
        //Enviamos clases a las que no asiste, divididas de llenas o las que hay hueco
        res.send({ clasesNoLlenas, clasesLlenas });
    });
}
