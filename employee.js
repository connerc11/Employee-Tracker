const { EEXIST } = require("constants");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const util = require("util");

const connectionLevels = mysql.createConnection({
  host: "localhost",
  // port: 3001,
  user: "root",
  password: "USCaptain33",
  database: "employee_trackersDB",
});
connectionLevels.connect(function (err) {
  if (err) throw err;
});
// const dbQuery = util.promisify(connectionLevels.query)

connectionLevels.query("SELECT * FROM department", (err, results) => {
  if (err) {
    return console.log(err.message);
  }
  return results;
});

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
        "Update an employee role",
      ],
    })
    .then((answers) => {
      if (answers.action === "View all departments") {
        connectionLevels.query("SELECT * FROM department", (err, results) => {
          if (err) {
            return console.log(err.message);
          }
          console.log(results);
          return results;
        });
      } if (answers.action === "Add a department") {
        connectionLevels.query(
          "INSERT INTO department SET ? ",
          { name: "Accounting" },
          (err, results) => {
            if (err) {
              return console.log(err.message);
            }
            console.log(results);
            return results;
          }
        );
      }
      if (answers.action === "View all roles") {
        connectionLevels.query("SELECT * FROM role", (err, results) => {
          if (err) {
            return console.log(err.message);
          }
          console.log(results);
          return results;
        });
      } if (answers.action === "Add a role") {
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
                message: `What is the salary of the new salary?`,
              },
              {
                name: "department_id",
                type: "input",
                message: "What is the department of this new role?",
              },
            ])
            .then((answers) => {
              const role = answers.new_role;
              const salary = answers.salary;
              const department_id = answers.department_id;
              connectionLevels.query(
                `INSERT INTO role SET (new_role, salary, department_id) VALUES "${role}", "${salary}", "${department_id}"`,
                (err,
                (results) => {
                  if (err) {
                    throw err;
                  }
                })
              );
              console.table(results);
            });
        });
      }
      if (answers.action === "View all employees") {
        connectionLevels.query(
          "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id FROM employee",
          (err, results) => {
            if (err) {
            return console.log(err.message);
          }
          console.log(results);
          return results;
        }
        );
      }if (answers.action === "Add an employee") {
        connectionLevels.query("INSERT INTO employee", (err, results) => {
          if (err) throw err;

          inquirer
            .prompt([
              {
                type: "input",
                message: "Please enter the employee's first name",
                name: "first_name",
              },
              {
                type: "input",
                message: "Please enter the employee's last name",
                name: "last_name",
              },
              {
                type: "input",
                message: "Please enter the employee's role",
                name: "role_id",
              },
              {
                type: "input",
                message: "Please enter the employee's manager",
                name: "manager_id",
              },
            ])
            .then((answers) => {
              const first_name = answers.first_name;
              const last_name = answers.last_name;
              const role_id = answers.role_id;
              const manager_id = answers.manager_id;
              connectionLevels.query(
                `INSERT INTO employee.first_name, employee.last_name, employee.role_id, employee.manager_id VALUES ${first_name} ${last_name} ${role_id} ${manager_id}`,
                (err, results) => {
                  if (err) throw err;
                  return results;
                }
              );
            });
        });
      }
      if (answers.action === "Update an employee role")
        inquirer
          .prompt([
            {
              type: "input",
              message: "Enter the employee's ID that needs to be updated",
              name: "EmployeeUpdate",
            },
            {
              type: "input",
              message: "Enter the new role ID for the employee!",
              name: "UpdateRole",
            },
          ])
          .then((answers) => {
            const updateE = answers.updateE;
            const updateR = answers.updateR;
            connectionLevels.query(
              `UPDATE employee SET role_id ${updateR} WHERE id = ${updateE}`,
              (err,
              (results) => {
                if (err) throw err;
                console.log(results);
              })
            );
          });
    });
}
//

mainMenu();
