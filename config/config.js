
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'todoakic_root',
    password: 'todoaki021009',
    database: 'todoakic_app_dely'
});


db.connect(function(err){
    if (err) throw err;
    console.log('DATA BASE CONNECTED');

});


module.exports = db;

/*
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'app_dely'
});


db.connect(function(err){
    if (err) throw err;
    console.log('DATA BASE CONNECTED');

});


module.exports = db;

*/
