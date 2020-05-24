const controlador = require('./controlador');

module.exports = (router) => {
    router.get('/', (req, res) => {
        
        res.send('Api para acceso a BD IMPACTO en MongoDB');
    });

    //Rutas para usuario
    router.post('/registrarUsuario', function (req, res) {
        controlador.crearUsuario(req, res);
    });
    router.post('/loginUsuario', function (req, res) {
        controlador.loginUsuario(req, res);
    });
    router.post('/listarUsuarios', function (req, res) {
        controlador.listarUsuarios(req, res);
    });
}