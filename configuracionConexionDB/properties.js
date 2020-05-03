module.exports = {
  //Indicamos el puerto al que escucharemos y la base de datos de mongodb
  PUERTO: process.env.PORT || 3000,
  DB: 'mongodb+srv://impacto:impacto@webappgimnasiocluster-jjhpo.gcp.mongodb.net/test?retryWrites=true&w=majority'
}
