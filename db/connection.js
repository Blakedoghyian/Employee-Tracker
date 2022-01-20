const mysql = require('mysql2');

// connection creds

const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'Zinnia1998',
    database: 'employee_tracker'
});

//export to server.js

module.exports = db;