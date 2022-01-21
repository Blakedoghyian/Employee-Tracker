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
        name: 'userprompt',
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
    .then(answer => {
        switch (answer.userprompt) {
            case 'View departments':
                viewDepartments();
                break;
                // return promptUser();
            case 'View roles':
                viewRoles();
                break;
                // return promptUser();
            case 'View employees':
                viewEmployees();
                break;
                // return promptUser();
        }
    });
};
//  use query to get departments table
function viewDepartments() {
    var query = 'SELECT * FROM departments';
    db.query(query, function(err, res) {
        if(err)throw err;
        console.log('All Departments:');
        // displays response
        console.table(res);
        returnPrompt();
    })
};

// use query to get roles table 
function viewRoles() {
    var query = 'SELECT * FROM roles';
    db.query(query, function(err,res) {
        if(err)throw err;
        console.log('All Roles:');
        console.table(res);
        returnPrompt();
    })
};

function viewEmployees() {
    var query = 'SELECT * FROM employees';
    db.query(query, function(err,res) {
        if(err)throw err;
        console.log('All Employees:');
        console.table(res);
        returnPrompt();
    })
};

function returnPrompt() {
    inquirer
    .prompt({
        name: 'returnUser',
        type: 'list',
        message: 'Return to options ',
        choices: [
            ' here.'
        ]
    })
    .then(answer => {
        switch(answer.returnUser) {
            case ' here.':
                promptUser();
                break;
        }
    })
};
