const db = require('../config/config');



const CategoriesStore = {};


CategoriesStore.getCategoriesStore = (params, result) => {
    const sql =`
    SELECT 
        CONVERT(idcategory, char) as idcategory, 
        category, 
        description, 
        image, 
        CONVERT(active, char) as active, 
        created_at, 
        updated_at 
    FROM 
        categories_${params.directory}
    WHERE
        active = 1 and pref = ${params.pref}` ;
    
    db.query(
        sql,
        (err, data) => {
            if (err){
                result(err,null);
            }else {
                result(null, data);

            }
        }

    )
}

CategoriesStore.getCategoryId = (categoryId, result) => {
    const sql =`
    SELECT 
        CONVERT(idcategory, char) as idcategory, 
        category, 
        description, 
        image, 
        CONVERT(active, char) as active, 
        created_at, 
        updated_at 
    FROM 
        categories_${categoryId.directory}
    WHERE
    idcategory = ? and active = 1` ;
    
    db.query(
        
        sql,
        [
            categoryId.idcategory
        ],
        (err, data) => {
            if (err){
                result(err,null);
            }else {
                result(null, data);

            }
        }

    )
}

CategoriesStore.createCategory = (category, result) => {
    const sql =`
            INSERT INTO 
                categories_${category.directory}(
                    category, 
                    description,  
                    active, 
                    pref,
                    created_at, 
                    updated_at) 
                VALUES (?, ?, ?, ?, ?, ?)
        
        `;
    db.query(
        sql,
        [
            category.category,
            category.description,
            "1",
            category.pref,
            new Date(),
            new Date()
            
        ],
        (err, id) => {
            if (err){
                result(err, null);
            }else{
                var data = { };
                    
                data= {
                        idcategory:`${id.insertId}`  ,
                        category:  category.category,
                        description: category.description,
                        image: "",
                        active: "1"
        
                };
                
                console.log("Id de categoria: ",data);
                result(null, data);
                /*console.log("Id de categoria: ",data.insertId);
                result(null, data.insertId);*/
            }
        }

    )
}
CategoriesStore.updateCategory = (category, result) => {
        const sql =`
        UPDATE 
            categories_${category.directory} 
        SET 
            category=?,
            description=?,
            active=?,
            updated_at=?
         WHERE 
            idcategory = ?
            
            `;
        db.query(
            sql,
            [
                category.category,
                category.description,
                "1",
                new Date(),
                category.idcategory
               
                
            ],
            (err, data) => {
                if (err){
                    result(err, null);
                }else{
                    var data = { };
                    
                    data= {
                            idcategory: category.idcategory,
                            category:  category.category,
                            description: category.description,
                            image: "",
                            active: "1"
            
                    };
                    
                    console.log("Id de categoria: ",data);
                    result(null, data);
                }
            }
    
        );
}

CategoriesStore.findCategoryProduct = (category, result) => {

    const sql =
    
    `SELECT 
        COUNT(idcategory) as numcategory 
    FROM products_todoaki 
    WHERE idcategory =?`
    ; 
    db.query(
        sql,
        [
            category.idcategory
        ],
        (err, data) => {
            if (err){
                result(err, null);
            }else{
                
                result(null, data);
                
            }
        }
    )


  
}


CategoriesStore.deleteCategory = (category, result) => {

    
        const sql = `
            DELETE 
            FROM 
                categories_${category.directory} 
            WHERE 
                idcategory = ?   
            `;
            db.query(
                sql,
                [
                    category.idcategory
                ],
                (err, data) => {
                    if (err){
                        result(err, null);
                    }else{
                        console.log('Data de las Sub categorias', data);
                        result(null, data);

                    }
                }
            )

              

  
}




module.exports = CategoriesStore;


