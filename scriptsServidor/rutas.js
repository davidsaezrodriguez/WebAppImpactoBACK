const controlador = require('./controlador');

module.exports = (router) => {
    router.get('/', (req, res) => {
        res.send('Api para acceso a BD IMPACTO en MongoDB');
    });

    //Rutas para usuario
    router.post('/registrarUsuario', function (req, res) {
        controlador.registrarUsuario(req, res);
    });
    router.post('/loginUsuario', function (req, res) {
        controlador.loginUsuario(req, res);
    });
    router.post('/listarUsuarios', function (req, res) {
        controlador.listarUsuarios(req, res);
    });

    //Rutas para tablas
    router.post('/crearTabla', function (req, res) {
        controlador.crearTabla(req, res);
    });
    router.post('/listarTablasUsuario', function (req, res) {
        controlador.listarTablasUsuario(req, res);
    });
    router.post('/buscarTabla', function (req, res) {
        controlador.buscarTabla(req, res);
    });
    
}
