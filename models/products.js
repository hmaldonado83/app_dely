
const db = require('../config/config');



const ProductStore = {};

ProductStore.createProduct = (product, result) => {
    const sql= `
    INSERT INTO 
        products_${product.directory}(
            name, 
            description, 
            price,
            idcategory, 
            stock, 
            image1, 
            image2, 
            image3, 
            active,
            created_at, 
            updated_at)
        
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )

    `;
    db.query(
        sql,
        [
            product.name,
            product.description,
            product.price,
            product.idcategory,
            product.stock,
            product.image1,
            product.image2,
            product.image3,
            product.active,
            new Date(),
            new Date()

        ],
        (err, id) => {
            if (err){
                result(err, null)
            }else{
                

                var data = { };
                
                data= {
                    id: id.insertId.toString(),
                    name: product.name,
                    description: product.description,
                    price: product.price.toString(),
                    idcategory: product.idcategory,
                    category: "",
                    stock: product.stock.toString(),
                    active: product.active,
                    images:[`${product.directory}/${product.image1}`, `${product.directory}/${product.image2}`, `${product.directory}/${product.image3}`]
        
                };
                
                console.log("El Producto a sido creado ", id.insertId)
                result(null, data);
            



                
                
            }
        }
    )
}

ProductStore.updateProduct = (params,product, result) => {
    
    const sql = `
        UPDATE
            products_${params.directory}
        SET
            name=?, 
            description=?, 
            price=?,
            idcategory=?, 
            stock=?, 
            image1=?, 
            image2=?, 
            image3=?, 
            active=?,
            updated_at=?
        WHERE id = ${params.id}
    
    `;
    db.query(
        sql,
        [
            product.name,
            product.description,
            product.price,
            product.idcategory,
            product.stock,
            product.image[0],
            product.image[1],
            product.image[2],
            product.active,
            new Date()
         
        ],
        (err, data) => {
            if (err){
                result(err, null);
            }else{
                var data = { };
                
                data= {
                    id:params.id,
                    name: product.name,
                    description: product.description,
                    price: product.price.toString(),
                    idcategory: product.idcategory,
                    category: "",
                    stock: product.stock.toString(),
                    active: product.active,
                    images:[`${params.directory}/${product.image[0]}`, `${params.directory}/${product.image[1]}`, `${params.directory}/${product.image[2]}`]
        
                };
                
                console.log("Id de categoria: ",data);
                result(null, data);
            }
        }
    )
}

ProductStore.pgProduct = (params,result) => {
   
    if (params.typeCount=="0"){
       const  sql = 
            `SELECT 
                count(id) as registro
            FROM products_${params.directory}
            WHERE active = ${params.status}
            `;
            db.query(
                sql,
                
                (err, data) =>{
                    if (err){
                        console.log('error', err);
                        result(err, null)
                    }else {
                        console.log(`cantidad de pagina ${data}`)
                       // console.log('error', err);
                       result(null, data);
                    }
                    
                }
            )
   } else  if (params.typeCount=="1"){
     const sql = 
            `SELECT 
                count(id) as registro
            FROM products_${params.directory}
            WHERE active = ${params.status}
            AND LOWER(name) LIKE  '%${params.name.toLowerCase()}%'
            `; 
            db.query(
                sql,
                
                (err, data) =>{
                    if (err){
                        console.log('error', err);
                        result(err, null)
                    }else {
                        console.log(`cantidad de pagina ${data}`)
                       // console.log('error', err);
                       result(null, data);
                    }
                    
                }
            )
        
    
    
    
    }
    

}
ProductStore.getProductsStore = (params,result) => {
  
    console.log(`Consultando parametro directory ${params.directory}`);
    console.log(`Consultando parametro status ${params.status}`);
    console.log(`Consultando parametro limit ${params.limit}`);
    console.log(`Consultando parametro offset ${params.offset}`);
   
        const sql = 
    `SELECT 
            
            CONVERT(a.id, char) as id, 
            a.name, 
            a.description, 
            CONVERT(a.price, char) as price, 
            CONVERT(a.idcategory, char) as idcategory, 
            b.category,
            CONVERT(a.stock,char) as stock, 
            CONVERT(a.active, char) as active,
            a.image1,
            a.image2,
             a.image3
        FROM products_${params.directory} a
        INNER JOIN categories_${params.directory} b 
        ON a.idcategory = b.idcategory
        WHERE a.active = ?
        AND  b.active = 1
        ORDER BY a.id  
        LIMIT ?  OFFSET ?
        `;

      
     
 db.query(
        sql, 
        [params.status,Math.floor(params.limit),Math.floor(params.offset)],
        (err, data) => {
            if (err){
                console.log('error', err);
                result(err, null)
            }else {
               // console.log('error', err);
               result(null, data);
            }
            
        }
    )

}
ProductStore.getProductsName = (params, result) => {
    const sql = 
    `SELECT 
            


                CONVERT(a.id, char) as id, 
                a.name, 
                a.description, 
                CONVERT(a.price, char) as price, 
                CONVERT(a.idcategory, char) as idcategory, 
                b.category,
                CONVERT(a.stock,char) as stock, 
                CONVERT(a.active, char) as active,
                a.image1,
                a.image2,
                a.image3
        FROM products_${params.directory} a
        INNER JOIN categories_${params.directory} b 
        ON a.idcategory = b.idcategory
        WHERE a.active = ${params.status} AND LOWER(a.name) LIKE ?
        AND  b.active = 1
        GROUP BY id
        LIMIT ${params.limit} OFFSET ${params.offset} `;
    db.query(
        sql,
        [`%${params.name.toLowerCase()}%`, ],
        (err, data) => {
            if (err){
                console.log('error', err);
                result(err, null)
            }else {
               // console.log('error', err);
               result(null, data);
            }
            
        }
    ) 
}

ProductStore.getProductId = (params, result) => {
    const sql = 
    `SELECT 
        CONVERT(a.id, char) as id, 
        a.name, 
        a.description, 
        CONVERT(a.price, char) as price, 
        CONVERT(a.idcategory, char) as idcategory, 
        CONVERT(a.stock,char) as stock, 
        CONVERT(a.active, char) as active,
       a.image1,
        a.image2,
         a.image3
        FROM products_${params.directory} a
        WHERE a.id = ${params.id}`;
    db.query(
        sql,
        (err, data) => {
            if (err){
                console.log('error', err);
                result(err, null)
            }else {
               // console.log('error', err);
               result(null, data);
            }
            
        }
    )
    
}



ProductStore.createPreference = (params, result) => {
    const sql =`
        INSERT INTO
            preferences_${params.directory}(
                idproduct,
                idcategory
            )
        VALUES (?,?)
    `;
    db.query(
        sql,
        [
            params.idproduct,
            params.idcategory
        ],
        (err, id) =>{
            if (err){
                result(err,null);
            }else{
                result(null,id.insertId)
            }
        }
    )
}
ProductStore.findCategory = (params, result) => {
    const sql =`
       SELECT idcategory,
            category
        FROM
        categories_${params.directory}
        WHERE idcategory = ${params.idcategory}
    `;
    db.query(
        sql,
        
        (err, category) =>{
            if (err){
                result(err,null);
            }else{
                result(null,category[0])
            }
        }
    )
}

ProductStore.getSubPreferencias = (params, result) => {

    const sql =`
    SELECT  CONVERT(a.idcategory,char) as idcategory,c.category as preference,CONVERT(b.idpreference,char) as idpreference,

 CONCAT('[',

        GROUP_CONCAT(

        JSON_OBJECT(

        'idsubpreference', CONVERT(b.idsubpreference,char),

        'idpreference',CONVERT(b.idpreference,char),

        'idsubcategory',  CONVERT(a.idsubcategory,char),

        'subcategory',a.subcategory,
            
         'active',CASE WHEN b.idpreference IS NULL THEN '0' ELSE '1' END 
        
        )

        ),

        ']') AS subpreferences


            
            FROM subcategories_${params.directory}   a
            LEFT JOIN subpreferences_${params.directory}  b
            ON a.idsubcategory = b.idsubcategory   AND b.idpreference = ${params.idpreference}
			INNER JOIN categories_${params.directory}  c ON a.idcategory = c.idcategory
            WHERE a.idcategory = ${params.idcategory}
            GROUP BY a.idcategory`
        ;
  
    db.query(
        sql,
        (err, data) => {
            if (err){
                result(err, null)
            }else {
               result(null, data[0]);
            }
        }
    )
}

ProductStore.deletepreference = (params, result) => {
    const sql =  `
        DELETE FROM preferences_${params.directory}
        WHERE idpreference = ${params.idpreference}

    `;
    db.query(

        sql,
        (err, data) =>{
            if (err){
                
                result(err, null)
            }else {
               
               
               result(null, data);
            }
            
        }

    )
}

ProductStore.deleteSubPreference = (params, result) => {
    const sql =  `
        DELETE FROM subpreferences_${params.directory}
        WHERE idsubpreference = ${params.idsubpreference}

    `;
    db.query(

        sql,
        (err, data) =>{
            if (err){
                
                result(err, null)
            }else {
               
               
               result(null, data);
            }
            
        }

    )
}


ProductStore.getPreference = (params,result) => {
    
    const sql = `SELECT CONVERT(a.idpreference ,char) as idpreference,
                    CONVERT(a.idcategory,char) as idcategory,
                    b.category
                FROM
                    preferences_${params.directory} a 
                INNER JOIN
                    categories_${params.directory} b 
                ON
                    a.idcategory = b.idcategory
                WHERE a.idproduct = ${params.idproduct}`;
    db.query(
        sql,
        (err, data) => {
            if (err){
                result(err, null)
            }else {
               result(null, data);
            }
        }
    )
}
ProductStore.updateSubPreference = (params, result) => {
    console.log(`Este es el directoriro para guarda la subpreferencia ${params.directory}`)



    console.log(`Todos los parametros  ${params.idpreference} id subcategory ${params.idsubcategory}    id category ${params.idcategory}  `)
    const sql =`
  
    
    INSERT INTO 
        subpreferences_${params.directory} ( 
            idpreference, idsubcategory, idcategory) 
    VALUES (?,?,?)   
    `
        ;

    db.query(
        sql,
        [params.idpreference, params.idsubcategory, params.idcategory],
        (err, id) =>{
            if (err){
                result(err,null);
            }else{
                result(null,id.insertId)
            }
        }
    );
}

ProductStore.findSubPreferencias = (params, result) => {

    const sql =`
  
    SELECT  CASE WHEN b.idsubpreference IS NULL THEN '0' ELSE b.idsubpreference END AS idsubpreference , CASE WHEN b.idpreference IS NULL THEN '0' ELSE b.idpreference END AS idpreference , CONVERT(a.idsubcategory, char) as idsubcategory, a.subcategory,
        CASE WHEN b.idsubpreference IS NULL THEN '0' ELSE '1' END AS active
        FROM subcategories_${params.directory} a 
        LEFT JOIN  subpreferences_${params.directory} b
        ON a.idsubcategory = b.idsubcategory AND b.idpreference =  ${params.idpreference}

        where  a.idcategory  = ${params.idcategory};
    
    `
        ;
  
    db.query(
        sql,
        (err, data) => {
            if (err){
                result(err, null)
            }else {
               result(null, data);
            }
        }
    )
}



module.exports = ProductStore;