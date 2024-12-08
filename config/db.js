const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,     
    port: process.env.DB_PORT,        
    database: process.env.DB_DATABASE,   
    user: process.env.DB_USERNAME,     
    password: process.env.DB_PASSWORD 
});

connection.connect(function(err) {
    if (err) {
        console.log("error occurred while connecting");
    } else {
        console.log("connection created with mysql successfully");
    }
});

