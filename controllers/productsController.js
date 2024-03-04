
const { json } = require('express');
const ProductStore = require('../models/products');
const { uploadImage } = require('../process/uploadimg');
const asyncForEach = require('../utils/async_foreach');
const path = require('node:path')
module.exports = {
   async  createProduct (req, res){
    const product = req.body;
    const files = req.files;
    const fileProduct = req.body.directory;

    console.log(`este es el guardar producto ${product.name}`)

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image1 ) {
      console.log("Debe selecciona la primera imagen");

      var data = {};
          data= {
              success: false,
              message: "Debe selecciona la primera imagen",
             // error: err

          }
          return res.status(400).json(data);
     // res.status(400).send({msg:'Debe seleccionar tres fotos para el producto'});
     // return;
    }

    try {
      // enviar undefined para enviar un parametro vacio
       // enviar undefined para enviar un parametro vacio
       const extValidas = ['png', 'jpg', 'jpeg', 'gif']

       for (const file in req.files) {
        console.log("ntro aqui");
          const image = req.files[file];
          const nombreCorto = image.name.split('.');
          const ext = nombreCorto[nombreCorto.length - 1];
          console.log(ext);
          if (!extValidas.includes(ext)){
            return res.status(400).json({msg: `La extension .${ext} no es valida, ${extValidas}`});
          }
       }

      
       for (const file in req.files) {

        
    
        const uploadComplete = await uploadImage(req.files[file],fileProduct);
          if (file == 'image1'){
            
            product.image1 = uploadComplete;
            

            console.log(`este es el nombre de la imagen ${product.nbrimg1}`);
            
          } else if (file == 'image2'){
        
            product.image2 = uploadComplete;
           
          }else if (file == 'image3'){
            
            product.image3 = uploadComplete;
            
          }
        
      }

      ProductStore.createProduct(product,(err,data) => {
        if (err){
            var data = {};
              data= {
                  success: false,
                  message: 'Hubo un error al crear el producto',
                  error: err
  
              }
              return res.status(501).json(data);
        }
        return res.status(201).json(data);

      });

        
    } catch (msg) {
      res.status(400).json({ msg});
    } 
            
    },


    async  updateProduct (req, res){
      
      const params = req.params;
      const product = req.body;
      const files = req.files;
      const fileProduct  = req.params.directory;

      try {
        const extValidas = ['png', 'jpg', 'jpeg', 'gif']

        for (const file in req.files) {
          console.log(`ntro aqui primer paso funciona ${file}`);
            const image = req.files[file];
            const nombreCorto = image.name.split('.');
            const ext = nombreCorto[nombreCorto.length - 1];
            console.log(ext);
            if (!extValidas.includes(ext)){
              return res.status(400).json({msg: `La extension .${ext} no es valida, ${extValidas}`});
            }
        }


        for (const file in req.files) {
          const image = req.files[file].size;
          
          var siezekiloByte = parseInt(image / 1024);
          console.log(`tamaño de imagen  ${siezekiloByte}`);

          if(siezekiloByte > 2000){
              alert('');
              return res.status(501).json({msg: `El tamaño de la imagen ${siezekiloByte} supera el limite permitido 2mg`});
              
          }
        
        }

        for (const file in req.files) {
                
            if (file == 'image1'){
              const uploadComplete = await uploadImage(req.files[file],fileProduct,product.delimage1);
              product.image1 = uploadComplete;
              
              product.image[0] = product.image1 ;

      

            } else if (file == 'image2'){
              const uploadComplete = await uploadImage(req.files[file],fileProduct,product.delimage2);
              product.image2 = uploadComplete;
              product.image[1] = product.image2;
            
            }else if (file == 'image3'){
              const uploadComplete = await uploadImage(req.files[file],fileProduct,product.delimage3);
              product.image3 = uploadComplete;
              product.image[2] = product.image3;
            }
          
        }
        ProductStore.updateProduct(params,product, (err,data) => {
          console.log(`Este es el imagenes 333333333333333333 ${product.image[0]}`);
          if (err) {
            var data = {};
            data= {
                success: false,
                message: 'Hubo un error al actualizar el producto',
                error: err
  
            }
            return res.status(501).json(data);
          }
          return res.status(201).json(data);
        });
        
        
      } catch (msg) {
        
      }
      
     // res.json({id, directory});
    
    },

    viewImg(req, res){
      const fileProduct = req.params.directory;
      console.log(`Directorio de imagenes  ${fileProduct}`);
      const img = req.params.img;
      console.log( req.params.directory);
      const uploadPath = path.join( __dirname , '../img/',fileProduct,'/product/android/',img);
      //const uploadPath = path.join( __dirname + '/img/'+fileProduct+'/product/android/'+img);
      return res.sendFile( uploadPath );

    },

    
    
    getProductsStore(req, res) {
      const params = req.params;
     // console.log(`pasa por aqui ${req.params.offset}`);
  
      ProductStore.getProductsStore(params , (err, data) =>{
        if (err){
          var data = {};
          data = {
            success: false,
            message: 'Error al intentar buscar los productos',
            error: err
          }
          return res.status(501).json(data);
        }
       // return res.status(201).json(data);
        var product = [];
      
        
        data.forEach(item => {

            console.log(item.name);
          
          product.push({id: item.id,
            
            name: item.name,
            description: item.description,
            price: item.price,
            idcategory : item.idcategory ,
            stock: item.stock.toString(),
            active: item.active,
            images: [`${params.directory}/${item.image1}`, `${params.directory}/${item.image2}`, `${params.directory}/${item.image3}`] })
           
              
              
            
          
        });
        //console.log(product);
        return res.status(201).json(product);

      })
    },
    getProductsName(req, res) {
      const params = req.params;
      console.log(params);
      ProductStore.getProductsName(params,(err, data) => {
        if (err){
          var data = {};
          data = {
            success: false,
            message: 'Error al buscar los productos',
            error: err
          }
          return res.status(501).json(data);
        }
        var product = [];
        
        
        data.forEach(item => {


          
          product.push({id: item.id,
            
            name: item.name,
            description: item.description,
            price: item.price,
            idcategory : item.idcategory ,
            stock: item.stock,
            active: item.active,
            images: [`${params.directory}/${item.image1}`, `${params.directory}/${item.image2}`, `${params.directory}/${item.image3}`] })
           
              
              
            
          
        });
     
        return res.status(201).json(product);
      })
    },
    getProductId(req, res){
      const params = req.params;
      console.log(params);
      ProductStore.getProductId(params, (err, item) => {
        if (err){
          var data = {};
          data = {
            success: false,
            message : 'Error al buscar el producto',
            error: err
          }
          return res.status(501).json(data);
        }
        var product = {};
        
        
       
        
        product = {id: item[0].id, name: item[0].name, description: item[0].description,price: item[0].price,idcategory : item[0].idcategory,stock: item[0].stock,active: item[0].active,images: [`${params.directory}/${item[0].image1}`, `${params.directory}/${item[0].image2}`, `${params.directory}/${item[0].image3}`]}

       // console.log(`paso por aqui nombre ${data[0].price}`);
        return res.status(201).json(product);
      })
    }

,
    pgProduct(req, res){
      const params = req.params;

      ProductStore.pgProduct(params, (err, data) =>{
        if (err){
          var data = {};
          data = {
            success: false,
            message: 'Error al intentar buscar las paginas',
            error: err
          }
          return res.status(501).json(data);
        }
        var pg = {};
        
        
       
        
        pg = {pager: Math.ceil(data[0].registro/params.limit)}

      
        return res.status(201).json(pg);
        
      
      })

    },
    getPreference(req, res){
      const params = req.params;
      ProductStore.getPreference(params, (err, data) => {
        if (err){
          var data = {};
          data = {
            success: false,
            message: 'Error al intentar buscar las paginas',
            error: err
          }
          return res.status(501).json(data);
        }
       
        const subpreferences = [];
        data.forEach(item =>{
          subpreferences.push({
            idcategory: item.idcategory ,
            preference: item.category,
            idpreference: item.idpreference,
            expanded: false,
            subpreferences:null
          });

        })
       
        return res.status(201).json(subpreferences);

       
        //return res.status(201).json(data);

      })
    },
    createPreference(req, res){
      const params = req.params;


      ProductStore.createPreference(params,(err, idpreference)=> {
        if (err){
          var data = {};
          data = {
            success: false,
            message: 'Error al crear la preferencia',
            error: err
          }
          
          return res.status(501).json(data);
        }


        ProductStore.findCategory(params,(err,category) =>{
          if (err){
            var data = {};
            data = {
              success: false,
              message: 'Error al crear la preferencia',
              error: err
            }
            
            return res.status(501).json(data);
          }
          var data={};
          data = {
            idpreference:idpreference.toString(),
            idcategory: category.idcategory.toString(),
            preference:category.category
  
          }
  
          return res.status(201).json(data);
        })

        
/*

          ProductStore.getSubPreferencias(params, (err, data) => {
            if (err){
              var data = {};
              data = {
                success: false,
                message: 'Error al intentar buscar las paginas',
                error: err
              }
              
              return res.status(501).json(data);
            }
    
      
    
          
          const subpreferences = {
              idcategory: data.idcategory ,
              preference: data.preference,
              idpreference: idpreference.toString(),
              subpreferences: JSON.parse(data.subpreferences)
            }
            return res.status(201).json(subpreferences);
    
        
          })
*/
      })
      

      
    },
    updateSubPreference(req,res){
      const subpreference = req.body;
      console.log(subpreference.subcategory);
      ProductStore.updateSubPreference(subpreference, (err,idsubpreference) =>{
        if (err){
          var data = {};
          data = {
            success: false,
            message: 'Error al insertar la Subpreferencia',
            error: err
          }
          return res.status(501).json(data);
        }

        const subpreferenceLocal = {
          "idsubpreference":idsubpreference.toString(),
          "idpreference": subpreference.idpreference,
          "idsubcategory": subpreference.idsubcategory,
          "subcategory": subpreference.subcategory,
          "active": "1"
        };
        return res.status(201).json(subpreferenceLocal);

      })

    },
    deletepreference(req, res){
      const params = req.params;
      ProductStore.deletepreference(params, (err, data) => {
        if (err){
          var data = {};
          data = {
            success: false,
            message: 'Error al eliminar la preferencia',
            error: err
          }
          return res.status(501).json(data);
        }

        var data = {};
          data = {
            success: true,
            message: 'Preferencia eliminada',
            idpreference: params.idpreference
          }

        return res.status(201).json(data);
      })
    },
    deleteSubPreference(req,res){
      const subpreference = req.body;
      
      ProductStore.deleteSubPreference(subpreference, (err,idsubpreference) =>{
        if (err){
          var data = {};
          data = {
            success: false,
            message: 'Error al eliminar la Subpreferencia',
            error: err
          }
          return res.status(501).json(data);
        }

        const subpreferenceLocal = {
          "idsubpreference":"0",
          "idpreference": "0",
          "idsubcategory": subpreference.idsubcategory,
          "subcategory": subpreference.subcategory,
          "active": "0"
        };
        return res.status(201).json(subpreferenceLocal);

      })

    },
    findPreferencias(req, res){
      const params = req.params;
      ProductStore.findPreferencias(params, (err, data) => {
        if (err){
          var data = {};
          data = {
            success: false,
            message: 'Error al buscar las preferencia',
            error: err
          }
          return res.status(501).json(data);
        }

        const preferences = [];
        console.log(data);
        
       
        
        return res.status(201).json(data);
      })
    },

    findSubPreferencias(req,res){
      const params = req.params;

      ProductStore.findSubPreferencias(params, (err, data) => {
        if (err){
          var data = {};
          data = {
            success: false,
            message: 'Error al intentar buscar las paginas',
            error: err
          }

         
          return res.status(501).json(data);
        }
      
        return res.status(201).json(data);
      
      
      
      })

     /* ProductStore.findSubPreferencias(params, (err, data) => {
        if (err){
          var data = {};
          data = {
            success: false,
            message: 'Error al buscar las Subpreferencia',
            error: err
          }
          return res.status(501).json(data);
        }

              
        
        return res.status(201).json(data);
      })*/
    }
}












