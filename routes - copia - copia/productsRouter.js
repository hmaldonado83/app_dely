const ProductStore = require('../controllers/productsController');
const multer = require('multer');
const passport = require('passport');


module.exports = (app) => {
    const uploads = multer({dest: '../img/todoaki/product/android'});
    app.post('/api/products/createProduct',passport.authenticate('jwt', {session: false}), uploads.array('image',3) ,ProductStore.createProduct);
}