const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const SQL = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

SQL.connect((err) => {
    if (err) throw err;
    console.log(`Connected as id ${SQL.threadId}\n`);
    empTracker();
});

const empTracker = () => {
    inquirer
        .prompt([
            {
                name: 'initialInquiry',
                type: 'rawlist',
                message: 'Welcome to the employee management program. What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'View all employees by manager',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update employee\'s role',
                    'Update employee\'s manager',
                    'Remove a department',
                    'Remove a role',
                    'Remove an employee',
                    'View total salary of department',
                    'Exit program',
                ],
            },
        ])

        .then((response) => {
            switch (response.initialInquiry) {
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'View all employees by manager':
                    viewAllEmployeesByManager();
                    break;
                case 'Add a department':
                    addADepartment();
                    break;
                case 'Add a role':
                    addARole();
                    break;
                case 'Add an employee':
                    addAnEmployee();
                    break;
                case 'Update an employee\'s role':
                    updateEmployeeRole();
                    break;
                case 'Remove a department':
                    removeADepartment();
                    break;
                case 'Remove a role':
                    removeARole();
                    break;
                case 'Remove an employee':
                    removeAnEmployee();
                    break;
                case 'View total salary of department':
                    viewDepartmentSalary();
                    break;
                case 'Exit program':
                    SQL.end();
                    console.log('\nYou have exited the Employee Management Program. Thanks for using!\n');
                    return;
                default:
                    break;
            }
        });
};