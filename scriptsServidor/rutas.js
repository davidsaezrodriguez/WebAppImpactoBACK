const controladorUsuarios = require('./controladorUsuarios');
const controladorTablas = require('./controladorTablas');
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
    router.post('/listarUsuarios', comprobarToken, function (req, res) {
        controladorUsuarios.listarUsuarios(req, res);
    });
    router.post('/listarUsuariosFiltrarNivel', comprobarToken, function (req, res) {
        controladorUsuarios.listarUsuariosFiltrarNivel(req, res);
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

}

// function comprobarToken(req, res, next) {
//     var bearerToken;
//     var bearerHeader = req.headers["authorization"];
//     if (typeof bearerHeader !== 'undefined') {
//         var bearer = bearerHeader.split(" ");
//         bearerToken = bearer[1];
//         req.token = bearerToken;
//         next();
//     } else {
//         res.send('Error token no valido ');
//     }
// }
