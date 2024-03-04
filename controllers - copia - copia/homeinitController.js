const HomeInit = require('../models/homeinit');


module.exports = {


    getSliderInit(req, res){
        HomeInit.getSliderInit((err, data) =>{
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al busca los Slider',
                    error: err
                });
            }

            return res.status(201).json(data);
        }); 
    },

    createcategory(req, res){
        const category = req.body;
        
       HomeInit.createCategory(category,(err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al registar la categoria',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La categoria fue creada',
                data: `${id}`  // EL ID DEA NUEVA CATEGORIA
            });

        });


    },
    getAllInitcategory(req, res){
        HomeInit.getAllInitcategory((err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al busca las categorias',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },

    getAlliesPopular(req, res){
        HomeInit.getAlliesPopular((err,ally) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al busca los locales populares',
                    error: err
                });
            }

            
           /* const data = {
                idally:  ally.idally,
                ally: ally.ally,
                identification: ally.identification,
                whatsapp:ally.whatsapp,
                apikey:ally.apikey,
                branch: ally.branch,
                user: ally.user,
                direction: ally.direction,
                active: ally.active,
                logo: ally.logo,
                banners1: ally.banners1,
                banners2: ally.banners2,
                banners3: ally.banners3,
                directory: ally.directory,
                activeaki : ally.activeaki ,
                positive  : ally.positive  ,
                negative  : ally.negative  ,
                neutral  : ally.neutral  ,
                sales: ally.sales,
                lat: ally.lat,
                lgt: ally.lgt,
                mnuadmin: ally.mnuadmin  ,
                close: ally.close,
                category: ally.category

            }*/

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
                    category:  JSON.parse(item.category) 
    
                })
            });

            
            return res.status(201).json(data);
            //return res.status(201).json(data);
        })

    },

    getPromoInit(req, res){
        HomeInit.getPromoInit((err, data) => {
            if (err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al traer las promociones',
                    error: err
                });
            }
            return res.status(201).json(data);
        })
    },

    findAlliesInit(req, res){
        const name = req.params.name;
        console.log("data enviada $" , name)
        if (name != "" ){
            HomeInit.findAlliesInit(name,(err, ally) => {
                if (err){
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error al traer los aliados',
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
                        category:  JSON.parse(item.category) 
        
                    })
                });

                return res.status(201).json(data);
                
            })
        }else {
            var data = [];
            return data;
        }
        
        
    }



}