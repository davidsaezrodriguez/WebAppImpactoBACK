const controladorUsuarios = require('./controladorUsuarios');
const controladorTablas = require('./controladorTablas');

module.exports = (router) => {
    router.get('/', (req, res) => {
        res.send('Api para acceso a BD IMPACTO en MongoDB');
    });

    //Rutas para usuario
    router.post('/registrarUsuario', function (req, res) {
        controladorUsuarios.registrarUsuario(req, res);
    });
    router.post('/loginUsuario', function (req, res) {
        controladorUsuarios.loginUsuario(req, res);
    });
    router.post('/listarUsuarios', function (req, res) {
        controladorUsuarios.listarUsuarios(req, res);
    });
    router.post('/listarUsuariosFiltrarNivel', function (req, res) {
        controladorUsuarios.listarUsuariosFiltrarNivel(req, res);
    });

    //Rutas para tablas
    router.post('/crearTabla', function (req, res) {
        controladorTablas.crearTabla(req, res);
    });
    router.post('/listarTablasUsuario', function (req, res) {
        controladorTablas.listarTablasUsuario(req, res);
    });
    router.post('/buscarTabla', function (req, res) {
        controladorTablas.buscarTabla(req, res);
    });
    
}
