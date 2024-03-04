const homeinitController = require('../controllers/homeinitController');
const passport = require('passport');

module.exports = (app) => {

    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    app.post('/api/categoriesinit/createcategory', passport.authenticate('jwt', {session: false}) , homeinitController.createcategory);
    app.get('/api/categoriesinit/getAllInitcategory', passport.authenticate('jwt', {session: false}) ,  homeinitController.getAllInitcategory);
    app.get('/api/sliderinit/getSliderInit', passport.authenticate('jwt', {session: false}) , homeinitController.getSliderInit );
    app.get('/api/alliespopular/getAlliesPopular', passport.authenticate('jwt', {session: false}) , homeinitController.getAlliesPopular );
    app.get('/api/promotionallies/getPromoInit', passport.authenticate('jwt', {session: false}) , homeinitController.getPromoInit );
    app.get('/api/allies/findAlliesInit/:name', passport.authenticate('jwt', {session: false}) , homeinitController.findAlliesInit );
    //passport.authenticate('jwt', {session: false}) ,
  

}