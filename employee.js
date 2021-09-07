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
                "Add a department",
                "Add a role",
                "Add an employee",
            ]
        }).then(answers => {
            if (answers.action === "View all departments") {
                connectionLevels.query("SELECT * FROM department", (err, results) => {
                    if (err) {
                        return console.log(err.message);
                    } console.log(results)
                    return results;
                })
            } else if (answers.action === "Add a department") {
                connectionLevels.query("INSERT INTO department SET ? ", { name: "Accounting" }, (err, results) => {
                    if (err) {
                        return console.log(err.message);
                    } console.log(results);
                    return results;
                })
            } if (answers.action === "View all roles") {
                connectionLevels.query("SELECT * FROM role", (err, results) => {
                    if (err) {
                        return console.log(err.message);
                    } console.log(results)
                    return results
                })
            } else if (answers.action === "Add a role") {
                connectionLevels.query("SELECT * FROM department", (err, results) => {
                    if (err) throw err;

                    inquirer
                        .prompt([
                            {
                                name: "new_role",
                                type: "input",
                                message: "Please add the new role!",
                            },
                            {
                                name: "salary",
                                type: "input",
                                message: `What is the salary of the new ${new_role}?`

                            },
                            {
                                name: "department_id",
                                type: "input",
                                message: "What is the department of this new role?",
                            }
                        ]).then(answers => {
                            const role = answers.new_role
                            const salary = answers.salary
                            const department_id = answers.department_id
                            connectionLevels.query(`INSERT INTO role SET (new_role, salary, department_id) VALUES "${role}", "${salary}", "${department_id}"`);
                            if (err) {
                                throw err
                            } console.table(answers)
                        })

                })

            }if (answers.action === "View All Employees") {
                connectionLevels.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name")
                if (err) {
                    return console.log(err.message)
                }console.log(results)
                return results
            }else if (answers.action === "Add an employee") {
                connectionLevels.query("INSERT INTO employee", (err, results) => {
                    if (err) throw err

                    inquirer
                    .prompt([
                                
                    ])
                })

            }

        })

};
// 

mainMenu();