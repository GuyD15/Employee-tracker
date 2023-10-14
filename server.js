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