const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session')
const passport = require('passport');
//const multer = require('multer');
//const sharp = require('sharp');
const fileUpload = require('express-fileupload');





//***IMPORTA RUTAS 

const usersRoutes = require('./routes/userRoutes');
const homeInitRouter = require('./routes/homeInitRouter');
const findAlliesInit = require('./routes/findAlliesRouter');
const categoriesStore = require('./routes/categoriesRouter');
const  productStore = require('./routes/productsRouter');
const paymentsStore = require('./routes/paymentsRouter');
const port = process.env.PORT || 3000;


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
app.use(passport.initialize());

app.use(passport.session());

/// Fileupload cargar imagen
  app.use(fileUpload({
    useTemFiles: true,
    tempFileDir: '/tmp/',
    //createParentPath: true esto es para crear directorio si no existe
  }));
  
  


 //

require('./config/passport')(passport);


app.disable('x-powered-by');

app.set('port', port);


//**LLAMADO DE LAS RUTAS 
usersRoutes(app);
homeInitRouter(app);
findAlliesInit(app);
categoriesStore(app);
productStore(app);
paymentsStore(app);

server.listen(3000,'192.168.0.107' || 'localhost', function(){
//server.listen(3000,'10.10.10.131' || 'localhost', function(){
    console.log('funciona ' + port + ' iniciada....' );
});

// ERROR HANDLE

app.use((err, req, res, next) =>{
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

app.get('/', (req, res) =>{
    res.send('Ruta raiz del backend');
});

module.exports = {
    app: app,
    server: server
}

/// 200 - Respuesta exitosa
// 404 - La url no existe
/// 500 - Error interno del servidor
