const usersController = require('../controllers/usersController');
const passport = require('passport');
module.exports = (app) =>{
    
    app.post('/api/users/create', usersController.register);
    app.post('/api/users/login', usersController.login);
}