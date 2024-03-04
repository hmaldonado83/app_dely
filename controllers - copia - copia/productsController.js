
const ProductStore = require('../models/products');
const path = require('path');
const fileUpload = require('express-fileupload');
//uploads.array
module.exports = {
     createProduct(req, res){
        
        const product = req.body;
        const files = req.files;

     
      
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
          res.status(400).send({msg:'No ahi archivo que subir'});
          return;
        }
      
        
      
        const image = req.files.image;
      
        const uploadPath =path.join( __dirname + 'img/todoaki/product/android/' + image.name);
      
        
        image.mv(uploadPath, (err) => {
          if (err) {
            return res.status(500).json({err});
          }
      
          res.json({msg: 'File uploaded to ' + uploadPath});
        });

        

    }




}