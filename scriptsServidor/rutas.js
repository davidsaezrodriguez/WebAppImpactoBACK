const controladorUsuarios = require('./controladorUsuarios');
const controladorTablas = require('./controladorTablas');
const controladorEjercicios = require('./controladorEjercicios');

const comprobarToken = require('./token');

module.exports = (router) => {
    router.get('/', (req, res) => {
        res.send('Api para acceso a BD IMPACTO en MongoDB');
    });

    //Rutas para usuario
    router.post('/registrarUsuario', comprobarToken, function (req, res) {
        controladorUsuarios.registrarUsuario(req, res);
    });
    router.post('/loginUsuario', function (req, res) {
        controladorUsuarios.loginUsuario(req, res);
    });
    router.get('/listarUsuarios', comprobarToken, function (req, res) {
        controladorUsuarios.listarUsuarios(req, res);
    });
    router.post('/listarUsuariosFiltrarNivel', comprobarToken, function (req, res) {
        controladorUsuarios.listarUsuariosFiltrarNivel(req, res);
    });
    router.post('/buscarUsuario', comprobarToken, function (req, res) {
        controladorUsuarios.buscarUsuario(req, res);
    });
    router.post('/cambiarContrasena', comprobarToken, function (req, res) {
        controladorUsuarios.cambiarContrasena(req, res);
    });
    router.post('/modificarDatosUsuario', comprobarToken, function (req, res) {
        controladorUsuarios.modificarDatosUsuario(req, res);
    });


    //Rutas para tablas
    router.post('/crearTabla', comprobarToken, function (req, res) {
        controladorTablas.crearTabla(req, res);
    });
    router.post('/listarTablasUsuario', comprobarToken, function (req, res) {
        controladorTablas.listarTablasUsuario(req, res);
    });
    router.post('/buscarTabla', comprobarToken, function (req, res) {
        controladorTablas.buscarTabla(req, res);
    });
    router.post('/actualizarPeso', comprobarToken, function (req, res) {
        controladorTablas.actualizarPeso(req, res);
    });




    // Rutas para ejercicios
    router.post('/crearEjercicio', comprobarToken, function (req, res) {
        controladorEjercicios.crearEjercicio(req, res);
    });

    router.post('/listarEjerciciosZona', comprobarToken, function (req, res) {
        controladorEjercicios.listarEjerciciosZona(req, res);
    });
    router.post('/buscarEjercicio', comprobarToken, function (req, res) {
        controladorEjercicios.buscarEjercicio(req, res);
    });
    router.post('/eliminarEjercicio', comprobarToken, function (req, res) {
        controladorEjercicios.eliminarEjercicio(req, res);
    });



}
