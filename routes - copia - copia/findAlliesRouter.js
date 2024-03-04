const findAlliesController = require('../controllers/findalliesController');
const passport = require('passport');


module.exports = (app) => {

    app.get('/api/allies/getSubcategories/:idcategory', passport.authenticate('jwt', {session: false}), findAlliesController.getSubcategories);
    app.get('/api/allies/AlliesSubcategories/:idsubcategory/:limit/:offset', passport.authenticate('jwt', {session: false}), findAlliesController.findAlliesSubcategory);
    app.get('/api/allies/findAlliesName/:name/:idcategory/:limit/:offset', passport.authenticate('jwt', {session: false}), findAlliesController.findAlliesName);
    app.get('/api/allies/getAlly/:user', passport.authenticate('jwt', {session: false}), findAlliesController.getAlly);
}