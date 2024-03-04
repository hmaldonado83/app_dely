

const Payments = require('../models/payments');
const path = require('node:path')

module.exports = {

    getPayments(req,res){
        const params = req.params;
        console.log(req.params.directory);
        Payments.getPayments(params,(err, data) =>{
            if (err){
                return res.status(501).json({
                    success: false,
                    message: 'Error al traer los pagos',
                    error: err
                });
            }
            return res.status(201).json(data);

        });
    },
    viewImg(req, res){
        //const fileProduct = req.params.directory;
       // console.log(`Directorio de imagenes  ${fileProduct}`);
        const img = req.params.img;
        console.log( img);

        const uploadPath = path.join( __dirname , '../img/iconos/',img);
        //const uploadPath = path.join( __dirname + '/img/'+fileProduct+'/product/android/'+img);
        return res.sendFile( uploadPath );
  
      },
  

}