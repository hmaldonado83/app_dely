const db = require('../config/config');


const FindAllies = {};


FindAllies.getSubcategories = (idcategory, result) => {

    const sql = `
        SELECT 
            CONVERT(idsubcategory, char) as idsubcategory, 
            subcategory, 
            CONVERT(idcategory, char) as idcategory, 
            image, 
            CONVERT(active, char) as active  
        FROM
            subcategories_init
        WHERE
        idcategory = ? AND active = 1
        ORDER BY idsubcategory

            
    
    `;
    db.query(
        sql,
        [
            idcategory
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


FindAllies.findAlliesSubcategory = (idsubcategory,limit, offset, result) => {
    console.log('este es el parametro ' , limit, 'parametro offse' , offset);
    const sql = `
        SELECT
            CONVERT(b.idally, char) as idally, 
            b.ally, 
            b.identification, 
            b.whatsapp,
            b.apikey,
            b.branch, 
            b.user, 
            b.direction, 
            CONVERT(b.active, char) as active, 
            b.logo, 
            b.banners1, 
            b.banners2, 
            b.banners3, 
            b.directory, 
            CONVERT( b.activeaki , char) as activeaki, 
            CONVERT(b.positive  , char) as positive, 
            CONVERT(b.negative  , char) as negative, 
            CONVERT(b.neutral  , char) as neutral, 
            CONVERT(b.sales , char) as sales, 
            b.lat, 
            b.lgt, 
            CONVERT(b.mnuadmin  , char) as mnuadmin, 
            CONVERT( b.close , char) as close,
            b.keyword,
            CONCAT('[',

                    GROUP_CONCAT(

                    JSON_OBJECT(

                        'idsubcategory', CONVERT(d.idsubcategory, char),
                        'subcategory', d.subcategory,
                        'idcategory', CONVERT(d.idcategory, char),
                        'image', d.image,
                        'active', CONVERT(d.active, char))

                    ),

            ']') AS subcategory
            FROM 
                allies b
            INNER JOIN 
                subcategory_ally_init c
            ON b.idally = c.idally 
            INNER JOIN subcategories_init d
            ON c.idsubcategory = d.idsubcategory
            WHERE c.idsubcategory = ?
            GROUP BY b.idally 
            LIMIT ${limit} OFFSET ${offset}
    
    `;
    db.query(
        sql,
        [
            idsubcategory
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


FindAllies.findAlliesName = (name, idcategory, limit, offset, result) => {
    const sql = `
        SELECT
            CONVERT(b.idally, char) as idally, 
            b.ally, 
            b.identification, 
            b.whatsapp,
            b.apikey,
            b.branch, 
            b.user, 
            b.direction, 
            CONVERT(b.active, char) as active, 
            b.logo, 
            b.banners1, 
            b.banners2, 
            b.banners3, 
            b.directory, 
            CONVERT( b.activeaki , char) as activeaki, 
            CONVERT(b.positive  , char) as positive, 
            CONVERT(b.negative  , char) as negative, 
            CONVERT(b.neutral  , char) as neutral, 
            CONVERT(b.sales , char) as sales, 
            b.lat, 
            b.lgt, 
            CONVERT(b.mnuadmin  , char) as mnuadmin, 
            CONVERT( b.close , char) as close,
            b.keyword,
            CONCAT('[',

                    GROUP_CONCAT(

                    JSON_OBJECT(

                        'idsubcategory', CONVERT(d.idsubcategory, char),
                        'subcategory', d.subcategory,
                        'idcategory', CONVERT(d.idcategory, char),
                        'image', d.image,
                        'active', CONVERT(d.active, char))

                    ),

            ']') AS subcategory
        FROM 
                allies b
        INNER JOIN 
                subcategory_ally_init c
            ON b.idally = c.idally 
            INNER JOIN subcategories_init d
            ON c.idsubcategory = d.idsubcategory
        WHERE 
            LOWER(b.ally) LIKE ? AND b.active = 1 AND b.activeaki=1 AND d.idcategory = ${idcategory} OR 
            LOWER(d.idcategory) LIKE ?  AND b.active = 1 AND b.activeaki=1 AND d.idcategory = ${idcategory} OR 
            LOWER(b.branch) LIKE ?  AND b.active = 1 AND b.activeaki=1 AND d.idcategory = ${idcategory} OR
            LOWER(b.keyword) LIKE ?  AND b.active = 1 AND b.activeaki=1 AND d.idcategory = ${idcategory}

            

        GROUP BY b.idally
        LIMIT ${limit} OFFSET ${offset}

`;
    db.query(
        sql,
        [
            `%${name.toLowerCase()}%`,
            `%${name.toLowerCase()}%`,
            `%${name.toLowerCase()}%`,
            `%${name.toLowerCase()}%`
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

FindAllies.getAlly = (user, result) => {
    const sql = `
         
    SELECT
        CONVERT(idally, char) as idally, 
        ally, 
        identification, 
        whatsapp,
        apikey,
        branch, 
        user, 
        direction, 
        CONVERT(active, char) as active, 
        logo, 
        banners1, 
        banners2, 
        banners3, 
        directory, 
        CONVERT( activeaki , char) as activeaki, 
        CONVERT(positive  , char) as positive, 
        CONVERT(negative  , char) as negative, 
        CONVERT(neutral  , char) as neutral, 
        CONVERT(sales , char) as sales, 
        lat, 
        lgt, 
        CONVERT(mnuadmin  , char) as mnuadmin, 
        CONVERT( close , char) as close,
        keyword,
        limitpg,
        offsetpg,
        preference
    FROM 
            allies
    WHERE
            user = ?
    
    `;
    db.query(
        sql,
        [
            user
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


module.exports = FindAllies;