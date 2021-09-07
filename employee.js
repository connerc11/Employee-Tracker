const inquirer = require("inquirer");
const mysql = require("mysql2");
const util = require("util");


const connectionLevels = mysql.createConnection({
    host: "localhost",
    // port: 3001,
    user: "root",
    password: "USCaptain33",
    database: "employee_trackersDB"
})
connectionLevels.connect(function (err) {
    if (err) throw (err)
})
// const dbQuery = util.promisify(connectionLevels.query)

connectionLevels.query("SELECT * FROM department", (err, results) => {
    if (err) {
        return console.log(err.message);
    }
    return results;
})

function mainMenu() {

    inquirer
        .prompt({
            name: "action",
            type: "list",
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
        }).then(answers => {
            if (answers.action === "View all departments") {
                connectionLevels.query("SELECT * FROM department", (err, results) => {
                    if (err) {
                        return console.log(err.message);
                    }console.log(results)
                    return results;
                })
            }else if (answers.action === "Add a department") {
                connectionLevels.query("INSERT INTO department SET ? ", {name: "Accounting"}, (err, results) => {
                    if(err) {
                        return console.log(err.message);
                    }console.log(results);
                    return results;
                })
            }

        })

};
// 

mainMenu();