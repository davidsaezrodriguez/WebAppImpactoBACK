const controladorUsuarios = require('./controladorUsuarios');
const controladorTablas = require('./controladorTablas');
const controladorEjercicios = require('./controladorEjercicios');
const controladorDietas = require('./controladorDietas');
const controladorSeguimientos = require('./controladorSeguimientos');



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
    router.post('/eliminarUsuario', comprobarToken, function (req, res) {
        controladorUsuarios.eliminarUsuario(req, res);
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
    router.post('/eliminarTabla', comprobarToken, function (req, res) {
        controladorTablas.eliminarTabla(req, res);
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


    // Rutas para dietas
    router.post('/crearDieta', comprobarToken, function (req, res) {
        controladorDietas.crearDieta(req, res);
    });
    router.post('/listarDietasUsuario', comprobarToken, function (req, res) {
        controladorDietas.listarDietasUsuario(req, res);
    });
    router.post('/buscarDieta', comprobarToken, function (req, res) {
        controladorDietas.buscarDieta(req, res);
    });
    router.post('/eliminarDieta', comprobarToken, function (req, res) {
        controladorDietas.eliminarDieta(req, res);
    });

    // Rutas para seguimiento
    router.post('/crearSeguimiento', comprobarToken, function (req, res) {
        controladorSeguimientos.crearSeguimiento(req, res);
    });
    router.post('/buscarSeguimiento', comprobarToken, function (req, res) {
        controladorSeguimientos.buscarSeguimiento(req, res);
    });
    router.post('/guardarIndice', comprobarToken, function (req, res) {
        controladorSeguimientos.guardarIndice(req, res);
    });
    router.post('/guardarMedidas', comprobarToken, function (req, res) {
        controladorSeguimientos.guardarMedidas(req, res);
    });
    router.post('/eliminarIndice', comprobarToken, function (req, res) {
        controladorSeguimientos.eliminarIndice(req, res);
    });
    router.post('/eliminarMedidas', comprobarToken, function (req, res) {
        controladorSeguimientos.eliminarMedidas(req, res);
    });


}
