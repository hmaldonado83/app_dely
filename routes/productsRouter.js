const ProductStore = require('../controllers/productsController');
//const multer = require('multer');
const passport = require('passport');


module.exports = (app) => {
    
    app.post('/api/products/createProduct',passport.authenticate('jwt', {session: false}), ProductStore.createProduct);
	app.patch('/api/products/updateProduct/:directory/:id', passport.authenticate('jwt', {session: false}), ProductStore.updateProduct);
	app.get('/api/products/img/:directory/:img', ProductStore.viewImg);
	app.get('/api/products/pg/:directory/:typeCount/:status/:name/:limit', passport.authenticate('jwt', {session: false}), ProductStore.pgProduct);
	//app.put('/api/products/updateProduct/:coleccion/:id',[check('ddd')], passport.authenticate('jwt', {session: false}), ProductStore.updateProduct);
	app.get('/api/products/:directory/:limit/:offset/:status', passport.authenticate('jwt', {session: false}), ProductStore.getProductsStore);
	app.get('/api/products/:directory/:limit/:offset/:status/:name',passport.authenticate('jwt', {session:false}),ProductStore.getProductsName);
	app.get('/api/products/:directory/:id',passport.authenticate('jwt', {session:false}),ProductStore.getProductId);
	app.get('/api/preference/products/:directory/:idproduct', passport.authenticate('jwt', {session: false}), ProductStore.getPreference);
	app.get('/api/createPreference/products/:directory/:idcategory/:idproduct', passport.authenticate('jwt', {session: false}), ProductStore.createPreference);
	app.delete('/api/preference/:directory/:idpreference', passport.authenticate('jwt', {session: false}), ProductStore.deletepreference);
	app.get('/api/preference/subpreference/:directory/:idproduct', passport.authenticate('jwt', {session: false}), ProductStore.findPreferencias);
	app.get('/api/findSubPreferencias/:directory/:idpreference/:idcategory', passport.authenticate('jwt', {session: false}), ProductStore.findSubPreferencias);
	app.post('/api/subpreference/updateSubPreference',passport.authenticate('jwt', {session: false}), ProductStore.updateSubPreference);
	app.delete('/api/subpreference/deleteSubPreference',passport.authenticate('jwt', {session: false}), ProductStore.deleteSubPreference);

	
}
