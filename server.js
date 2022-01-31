
const inquirer = require('inquirer');
//require connection creds
const db = require('./db/connection');


// start inquirer prompt

function promptUser() {
    inquirer
    .prompt({
        name: 'userprompt',
        type: 'list',
        message: 'Employee tracker started, please select an option.',
        choices: [
// options for user to choose from
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
    // run this function if this option is selected
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
            case 'Add employee':
                addEmployee();
                break;
            case 'Update employee':
                updateEmployee();
                break;
            case 'Delete employee':
                removeEmployee();
                break;
            case 'Exit':
                db.end();
                break;
        }
    });
};
//  use query to get departments table
function viewDepartments() {
    // select ALL from departments table
    db.query('SELECT * FROM departments', function(err, res) {
        if(err)throw err;
        console.log('All Departments:');
        // displays response
        console.table(res);
        // selection to return back to prompt options
        returnPrompt();
    })
};

// use query to get roles table 
function viewRoles() {
    db.query('SELECT * FROM roles', function(err,res) {
        if(err)throw err;
        console.log('All Roles:');
        console.table(res);
        returnPrompt();
    })
};

function viewEmployees() {
    db.query('SELECT * FROM employees', function(err,res) {
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
        //displays department table to show the new data
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
            // uses name of questions above to select the answer and insert into corresponding columns on roles table
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

// remove role

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

function addEmployee() {
    inquirer
    .prompt(
        [
            {
                name: 'employee_first',
                type: 'input',
                message: 'Please enter the first name of your new employee'
            },
            {
                name: 'employee_last',
                type: 'input',
                message: 'Please enter the last name of your new employee'
            },
            {
                name: 'employee_role',
                type: 'input',
                message: 'What is the Role ID for this employee?'
            },
            {
                name: 'employee_manager',
                type: 'input',
                message: 'What is the Manager ID for this employee?'
            }
        ]
    ).then(answer => {
        db.query('INSERT INTO employees SET ?', {
            // takes answers from questions above and inserts into corresponding columns on employees table
            first_name: answer.employee_first,
            last_name: answer.employee_last,
            role_id: answer.employee_role,
            manager_id: answer.employee_manager
        });
        console.log('Employee added!')
        viewEmployees();
    })
};

function updateEmployee() {
    inquirer
    .prompt(
        [
            {
                name: 'update_employee',
                type: 'input',
                message: 'Please enter the Employee ID to update role'
            },
            {
                name: 'update_role',
                type: 'input',
                message: 'What is the NEW role ID for this employee?'
            }
        ]
    ).then(answer => {
        db.query('UPDATE employees SET role_id = ? WHERE id = ?',
        [
            answer.update_role,
            answer.update_employee
        ]);
        console.log('Employee updated!');
        viewEmployees();
    })
};

function removeEmployee() {
    inquirer
    .prompt({
        name: 'remove_emp',
        type: 'input',
        message: 'Are you sure you want to REMOVE and employee? (PERMANENT) enter Employee ID:'
    })
    .then(answer => {
        db.query('DELETE FROM employees WHERE ?', {
            id: answer.remove_emp
        })
        console.log('Employee removed!');
        viewEmployees();
    })
};

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