
const inquirer = require('inquirer');
//require connection creds
const db = require('./db/connection');


// const PORT = process.env.PORT || 3001;

// // Start server after DB connection
// db.connect(err => {
//     if (err) throw err;
//     console.log('Database connected.');
//     app.listen(PORT, () => {
//         console.log(`--Server running on port ${PORT}`);
//     });
// });


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
            'Remove department',
            'Add role',
            'Remove role',
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
            case 'View roles':
                viewRoles();
                break;
            case 'View employees':
                viewEmployees();
                break;
            case 'Add department':
                addDepartment();
                break;
            case 'Remove department':
                removeDepartment();
                break;
            case 'Add role':
                addRole();
                break;
            case 'Remove role':
                removeRole();
                break;
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

function addDepartment() {
    inquirer
    .prompt({
        name: 'add_department',
        type: 'input',
        message: 'Enter new department name'
    })
    .then(answer => {
        db.query('INSERT INTO departments SET ?',{
            name: answer.add_department
        });
        console.log('department added!!');
        viewDepartments();
    })
};

function addRole(){
    inquirer
    .prompt([
        {
            name: 'role_name',
            type: 'input',
            message: 'Enter a new role'
        },
        {
            name: 'role_salary',
            type: 'input',
            message: 'Enter a salary number for this role'
        },
        {
            name: 'role_dep',
            type: 'input',
            message: 'Please enter a department ID for this role'
        }
    ])
    .then(answer => {
        db.query('INSERT INTO roles SET ?', {
            title: answer.role_name,
            salary: answer.role_salary,
            department_id: answer.role_dep
        });
        console.log('role added!!')
        viewRoles();
    })
};
// remove department

function removeDepartment() {
    inquirer
    .prompt({
        name: 'removedep',
        type: 'input',
        message: 'Are you sure you want to REMOVE a department? (PERMANENT) Enter ID:'
    })
    .then(answer => {
        db.query('DELETE FROM departments WHERE ?',{
            id: answer.removedep
        })
        console.log('Department removed!');
        viewDepartments();
    })
};


function removeRole() {
    inquirer
    .prompt({
        name: 'removerole',
        type: 'input',
        message: 'Are you sure you want to REMOVE a role? (PERMANENT) Enter ID:'
    })
    .then(answer => {
        db.query('DELETE FROM roles WHERE ?',{
            id: answer.removerole
        })
        console.log('Role removed!');
        viewRoles();
    })
};
//ret
//return prompt

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

promptUser();