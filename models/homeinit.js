const db = require('../config/config');




const HomeInit = {};

HomeInit.getSliderInit = (result) => {
    const sql = `
        SELECT 
            CONVERT(idslider, char) as idslider, 
            image,
            CONVERT(active, char) as active
        FROM 
            slider_init 
        WHERE 
            active = 1
    `;
    db.query(
        sql,
        (err, data) => {
            if (err){
                console.log('Error:', err);
                result(err, null);
            }else {
                console.log('Silder', data);
                result(null, data);
            }

        }
    )
}

HomeInit.getAllInitcategory = (result) => {
    
    const sql = `
        SELECT 
            CONVERT(idcategory, char) as idcategory,
            category,
            image,
            CONVERT(active, char) as active
        FROM
            categories_init
        WHERE
            active = 1
        ORDER BY
            category   
    
    `;
    db.query(
        sql,
        (err, data) => {
            if (err){
                console.log('Error:', err);
                result(err, null);
            }else {
                console.log('Categorias', data);
                result(null, data);
            }

        }
    )
}

HomeInit.createCategory = (category, result) => {

    const sql = `
        INSERT INTO
            categories_init(
                category,
                active,
                created_at,
                updated_at 
            )
        VALUES (?, ?, ?, ?)
    
    `;

    db.query(
        sql,
        [
            category.category,
            0,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err){
                console.log('Error:', err);
                result(err, null);
            }else {
                console.log('Id categoria creada', res.insertId);
                result(err, res.insertId);
            }
        }

    )
}

HomeInit.getAlliesPopular = (result) => {
    
    const sql = `
            SELECT
            CONVERT(a.idally, char) as idally, 
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
            CONCAT('[',

                GROUP_CONCAT(

                JSON_OBJECT(

                    'idcategory', CONVERT(d.idcategory, char),

                    'category', d.category,
                    'image', d.image,
                    'active', CONVERT(d.active, char))

                ),

        ']') AS category
        FROM 
            allies_popular a
        INNER JOIN
            allies b
        ON a.idally = b.idally
        INNER JOIN category_ally_init c
        ON C.idally = B.idally
        INNER JOIN categories_init d
        ON d.idcategory = c.idcategory
        WHERE b.active = 1 AND b.activeaki=1
        GROUP BY a.idally
            
    `;
    db.query(
        sql,
        (err, data) => {
            if (err){
                console.log('Error:', err);
                result(err, null);
            }else {
                console.log('Aliados Populares', data);
                result(null, data);
            }

        }

    )
}

HomeInit.getPromoInit = (result) => {
    const sql = `
        SELECT 
            CONVERT(idally, char) as idally,
            image,
            description
        FROM
        promotion_init    
    `;
    db.query(
        sql,
        (err, data) => {
            if (err) {
                result(err, null);
            }else {
                result(null, data)

            }

        }
    )
}

HomeInit.findAlliesInit = (name, result) => {
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

                    'idcategory', CONVERT(d.idcategory, char),

                    'category', d.category,
                    'image', d.image,
                    'active', CONVERT(d.active, char))

                ),

        ']') AS category
            
        FROM 
            allies b
        
        INNER JOIN category_ally_init c
        ON c.idally = b.idally
        INNER JOIN categories_init d
        ON d.idcategory = c.idcategory
        WHERE  
            LOWER(b.ally) LIKE ? AND b.active = 1 AND b.activeaki=1 OR 
            LOWER(d.category) LIKE ?  AND b.active = 1 AND b.activeaki=1 OR 
            LOWER(b.branch) LIKE ?  AND b.active = 1 AND b.activeaki=1 OR
            LOWER(b.keyword) LIKE ?  AND b.active = 1 AND b.activeaki=1

            

        GROUP BY b.idally`;
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

module.exports = HomeInit;