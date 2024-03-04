const Payments = require('../controllers/paymentsController');
const passport = require('passport');



module.exports = (app) => {
    app.get('/api/getPayments/:directory', passport.authenticate('jwt', {session: false}), Payments.getPayments);
    app.get('/api/getPayments/img/:img', Payments.viewImg);
}