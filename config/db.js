
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',     // host for connection
    port: 3306,            // default port for mysql is 3306
    database: 'inventory-db',      // database from which we want to connect our node application
    user: 'root',          // username of the mysql connection
    password: 'chaker'       // password of the mysql connection
});

connection.connect(function(err) {
    if (err) {
        console.log("error occurred while connecting");
    } else {
        console.log("connection created with mysql successfully");
    }
});
