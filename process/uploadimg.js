const path = require('path/posix')
const fs = require('fs');
const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');

const uploadImage = (files ,folder = '', delImg = '',extValidas = ['png', 'jpg', 'jpeg', 'gif']) => {
    return new Promise((resolve, reject) => {
        
      
        const image = files;
       const nombreCorto = image.name.split('.');
       const ext = nombreCorto[nombreCorto.length - 1];
       if (!extValidas.includes(ext)){
        return reject(`La extension .${ext} no es valida, ${extValidas}`);
       }
       const nbrTemp = uuidv4() + '.' + ext;

       const uploadPath = path.join( __dirname , '../img/',folder,'/product/android/' , nbrTemp);
       image.mv(uploadPath, (err) => {
        if (err) {
          reject(err);
  
        }

        if (delImg.length>0){
          const pathImage = path.join( __dirname , '../img/',folder,'/product/android/' , delImg);
          if (fs.existsSync(pathImage)){
            console.log(`elimino la imagen ${delImg}`);
            fs.unlinkSync(pathImage);
          }

        }



   
        resolve(nbrTemp);
      
      });



    })
}


module.exports = {
    uploadImage
}



/*
 
  const path = require('path/posix')
const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');

const uploadImage = (files, i, folder = '',extValidas = ['png', 'jpg', 'jpeg', 'gif']) => {
    return new Promise((resolve, reject) => {
     
        const image = files.image[i];
        const nombreCorto = image.name.split('.');
        const ext = nombreCorto[nombreCorto.length - 1];

        if (!extValidas.includes(ext)){
         return reject(`La extension .${ext} no es valida, ${extValidas}`);
        }
       
        const nbrTemp = uuidv4() + '.' + ext;
      
        const uploadPath = path.join( __dirname , '../img/',folder,'/product/android/' , nbrTemp);
             
        image[i].mv(uploadPath, (err) => {
          if (err) {
            reject(err);
            //return res.status(500).json({err});
          }
          resolve(nbrTemp);
          //res.json({msg: 'File uploaded to ' + uploadPath});
        });


    })
}

 */