const CategoriesStore = require('../models/categories');


module.exports = {
    getCategoriesStore(req, res){
        const directory = req.params.directory;
        CategoriesStore.getCategoriesStore(directory,(err, data) => {
            if (err) {
                var data = {};
                data= {
                    success: false,
                    message: 'Hubo un error al buscar las Categorias',
                    error: err
    
                }
                return res.status(501).json(data);
               /* return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al buscar las Categorias',
                    error: err
                });  */            
            }
            return res.status(201).json(data);
        });
    },
    getCategoryId(req, res) {
        const categoryId = req.body;
        CategoriesStore.getCategoryId(categoryId, (err, category) => {
            if (err){
                var data = {};
                data= {
                    success: false,
                    message: 'Hubo un error al buscar las Categorias',
                    error: err
    
                }
                return res.status(501).json(data);
                /*return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al buscar la categoria',
                    error: err
                }); */
            }
         
            var data = { };
            category.forEach(item => {
                data= {
                    idcategory: item.idcategory,
                    category:  item.category,
                    description: item.description,
                    image: item.image,
                    active: item.active
    
                }
            });
            console.log(data);
            return res.status(201).json(data);
        })
    }
    ,
    createCategory(req, res) {
        const category = req.body;
        CategoriesStore.createCategory(category, (err, data) => {
            if (err) {
                var data = {};
                data= {
                    success: false,
                    message: 'Hubo un error al buscar las Categorias',
                    error: err
    
                }
                return res.status(501).json(data);
               /* return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al buscar las Categorias',
                    error: err
                });  */            
            }
            
            return res.status(201).json(data);
        });
    },
    updateCategory(req, res) {
        const category = req.body;
        CategoriesStore.updateCategory(category, (err, data) => {
            if (err) {
                var data = {};
                data= {
                    success: false,
                    message: 'Hubo un error al buscar las Categorias',
                    error: err
    
                }
                return res.status(501).json(data);
                /*return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al buscar las Categorias',
                    error: err
                });*/              
            }
            return res.status(201).json(data);
        
          /*  return res.status(201).json({
                success: true,
                message: 'Categoria actualizada',
                data: data/// Id de la nueva categoria
            });*/
        });
    },
    deleteCategory(req, res) {
        const category = req.body;
        CategoriesStore.findCategoryProduct(category,(err, result) => {
            if (err) {
                var data = {};
                data= {
                    delete: false,
                    message: 'Hubo un error al buscar las Categorias',
                    count: "0",
                    error: err,
                    idcategory: req.body.idcategory
    
                }
                return res.status(501).json(data);              
            }
            if (result[0].numcategory>0){
                var data = {};
                data= {
                    delete: false,
                    message: 'No se puede eliminar categoria',
                    count: `${result[0].numcategory}`  ,
                    error: err,
                    idcategory: req.body.idcategory
    
                }
                return res.status(201).json(data);

                /*return res.status(201).json({
                    success: true,
                    message: 'No se puede eliminar categoria',
                    data: data/// Id de la nueva categoria
                });*/
            }else{

                CategoriesStore.deleteCategory(category,(err, rows) => {
                    if (err) {
                        var data = {};
                        data= {
                            delete: false,
                            message: 'Hubo un error al intentar eliminar la categoria',
                            count: `${result[0].numcategory}` ,
                            error: err,
                            idcategory: req.body.idcategory
            
                        }

                        return res.status(501).json(data);              
                    }

                    var data = {};
                    data= {
                        delete: true,
                        message: 'Categoria eliminada',
                        count: `${result[0].numcategory}` ,
                        error: err,
                        idcategory: req.body.idcategory
        
                }
                return res.status(201).json(data);
                   /* console.log("se ha eliminado la categoria con el nuevo procedimiento", data);
                    return res.status(201).json({
                        success: true,
                        message: 'Categoria eliminada',
                        data: data/// Id de la nueva categoria
                    });*/
                });
                
            }

        })
    }


}