const categoriesController = require('../controllers/categoriesController');
const passport = require('passport');



module.exports = (app) => {
    app.get('/api/categoriesStore/getCategoriesStore/:directory/:pref', passport.authenticate('jwt', {session: false}), categoriesController.getCategoriesStore);
    app.get('/api/categoriesStore/getCategoryId', passport.authenticate('jwt', {session: false}), categoriesController.getCategoryId);
    app.post('/api/categoriesStore/createCategory', passport.authenticate('jwt', {session: false}), categoriesController.createCategory);
    app.patch('/api/categoriesStore/updateCategory', passport.authenticate('jwt', {session: false}), categoriesController.updateCategory);
    app.delete('/api/categoriesStore/deleteCategory', passport.authenticate('jwt', {session: false}), categoriesController.deleteCategory);
    
}