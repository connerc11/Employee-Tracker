const inquirer = require("requirer");
const mysql = require("mysql");


const connectionLevels = {
    hsot: "localhost",
    port: 3002,
    user: "root",
}

inquirer
.prompt({
    name: "action",
    type: "lsit",
    message: "main menu select",
    choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "View all roles",
        "Add a department",
        "Add a role",
        "Add an employee",
    ]
})