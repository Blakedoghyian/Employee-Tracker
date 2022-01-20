const express = require('express');
const inquirer = require('inquirer');
//require connection creds
const db = require('./db/connection');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    promptUser();
    app.listen(PORT, () => {
        console.log(`--Server running on port ${PORT}`);
    });
});

// start inquirer prompt

function promptUser() {
    inquirer
    .prompt({
        name: 'user prompt',
        type: 'list',
        message: 'Employee tracker started, please select an option.',
        choices: [

            'View departments',
            'View roles',
            'View employees',
            'Add department',
            'Add role',
            'Add employee',
            'Update employee',
            'Delete employee',
            'Exit'
        ]
    })
}
