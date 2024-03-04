const FindAllies = require('../models/findallies');




module.exports = {

    getSubcategories(req, res){
        const idcategory = req.params.idcategory;

        FindAllies.getSubcategories(idcategory,(err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al buscar las Subcategoria',
                    error: err
                });              
            }
            return res.status(201).json(data);
        });
    },
    findAlliesSubcategory(req, res){
        const idsubcategory = req.params.idsubcategory;
        const limit = req.params.limit;
        const offset = req.params.offset;
        FindAllies.findAlliesSubcategory(idsubcategory,limit,offset, (err, ally) =>{
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al buscar los aliado',
                    error: err
                });              
            }

            var data = [];
            ally.forEach(item => {
                data.push({
                    idally:  item.idally,
                    ally: item.ally,
                    identification: item.identification,
                    whatsapp:item.whatsapp,
                    apikey:item.apikey,
                    branch: item.branch,
                    user: item.user,
                    direction: item.direction,
                    active: item.active,
                    logo: item.logo,
                    banners1: item.banners1,
                    banners2: item.banners2,
                    banners3: item.banners3,
                    directory: item.directory,
                    activeaki : item.activeaki ,
                    positive  : item.positive  ,
                    negative  : item.negative  ,
                    neutral  : item.neutral  ,
                    sales: item.sales,
                    lat: item.lat,
                    lgt: item.lgt,
                    mnuadmin: item.mnuadmin  ,
                    close: item.close,
                    keyword: item.keyword,
                    subcategory:  JSON.parse(item.subcategory) 
    
                })
            });
            return res.status(201).json(data);
        
        });
    },
    findAlliesName(req, res){
       const name = req.params.name ; 
       const idcategory= req.params.idcategory ;
       const limit= req.params.idcategory ;
       const offset= req.params.offset ;

       FindAllies.findAlliesName(name, idcategory, limit, offset, (err, ally) => {
            if (err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al traer los Aliados',
                    error: err

                });
            }
            var data = [];
            ally.forEach(item => {
                data.push({
                    idally:  item.idally,
                    ally: item.ally,
                    identification: item.identification,
                    whatsapp:item.whatsapp,
                    apikey:item.apikey,
                    branch: item.branch,
                    user: item.user,
                    direction: item.direction,
                    active: item.active,
                    logo: item.logo,
                    banners1: item.banners1,
                    banners2: item.banners2,
                    banners3: item.banners3,
                    directory: item.directory,
                    activeaki : item.activeaki ,
                    positive  : item.positive  ,
                    negative  : item.negative  ,
                    neutral  : item.neutral  ,
                    sales: item.sales,
                    lat: item.lat,
                    lgt: item.lgt,
                    mnuadmin: item.mnuadmin  ,
                    close: item.close,
                    keyword: item.keyword,
                    subcategory:  JSON.parse(item.subcategory) 
    
                })
            });
            return res.status(201).json(data);
       })



    },
    getAlly(req, res){
        const user = req.params.user;
        FindAllies.getAlly(user, (err, ally) => {
            if (err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al traer el aliado',
                    error: err
                })
            }
            var data = { };
            ally.forEach(item => {
                data= {
                   

                    idally: item.idally, 
                    ally: item.ally, 
                    identification: item.identification, 
                    whatsapp: item.whatsapp,
                    apikey: item.apikey,
                    branch: item.branch, 
                    user: item.user, 
                    direction: item.direction, 
                    active: item.active, 
                    logo: item.logo, 
                    banners1: item.banners1, 
                    banners2: item.banners2, 
                    banners3: item.banners3, 
                    directory: item.directory, 
                    activeaki: item.activeaki, 
                    positive: item.positive, 
                    negative: item.negative, 
                    neutral: item.neutral, 
                    sales: item.sales, 
                    lat: item.lat, 
                    lgt: item.lgt, 
                    mnuadmin: item.mnuadmin, 
                    close: item.close,
                    keyword: item.keyword

                }
            });
            return res.status(201).json(data);
        });
    }



}


