const controlador = require('./controlador');

module.exports = (router) => {
    router.post('/registrarUsuario', function (req, res) {
        controlador.crearUsuario(req,res);
    });
    router.post('/loginUsuario',function (req, res) {
        controlador.loginUsuario(req,res);
    });
}