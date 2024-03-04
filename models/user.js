const db = require('../config/config');
const bcrypt = require('bcryptjs');

const User = {};

User.findById = (id, result) => {

    const sql = 
    ` SELECT      
        u.id, 
        u.email, 
        u.name, 
        u.tcli, 
        u.identification, 
        u.notification_token, 
        u.operator, 
        u.phone, 
        u.city, 
        u.image, 
        u.password,

        CONCAT('[',

        GROUP_CONCAT(

        JSON_OBJECT(

        'id', CONVERT(r.id, char),

        'name', r.name,

        'image', r.image,

        'route', r.route)

        ),

        ']') AS profile

    FROM users u

    INNER JOIN user_has_roles h ON h.id_user=u.id

    INNER JOIN roles r ON r.id= h.id_rol

    WHERE u.id=?

    GROUP BY u.id`;

    db.query(
        sql,
        [id],
        (err, user) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    )

}


User.findByEmail = (email, result) => {
    const sql = 
    ` SELECT      
        u.id, 
        u.email, 
        u.name, 
        u.tcli, 
        u.identification, 
        u.notification_token, 
        u.operator, 
        u.phone, 
        u.city, 
        u.image, 
        u.password,

        CONCAT('[',

        GROUP_CONCAT(

        JSON_OBJECT(

        'id', CONVERT(r.id, char),

        'name', r.name,

        'image', r.image,

        'route', r.route)

        ),

        ']') AS profile

    FROM users u

    INNER JOIN user_has_roles h ON h.id_user=u.id

    INNER JOIN roles r ON r.id= h.id_rol

    WHERE email=?

    GROUP BY u.id`;

  /*  const sql = `
    SELECT
        id,
        email, 
        name, 
        tcli, 
        identification, 
        notification_token, 
        operator, 
        phone, 
        city, 
        image, 
        password, 
        created_at, 
        updated_at
    FROM
        users
    WHERE
        email = ?
    `;*/

    db.query(
        sql,
        [email],
        (err, user) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    )

}

User.create = async (user, result) => {
    
    const hash = await bcrypt.hash(user.password, 10);

  
    const sql = `
        INSERT INTO
            users(
                email,
                name,
                tcli,
                identification,
                operator,
                phone,
                city,
                image,
                password,
                created_at,
                updated_at
            )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query
    (
        sql,
        [
            user.email,
            user.name,
            user.tcli,
            user.identification,
            user.operator,
            user.phone,
            user.city,
            user.image,
            hash,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del nuevo usuario:', res.insertId);
                result(null, res.insertId);
            }
        }
    )

}

module.exports = User;