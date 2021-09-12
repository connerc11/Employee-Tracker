const { EEXIST } = require("constants");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const util = require("util");
const cTable = require('console.table');

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
        viewDepartments();
      }
      if (answers.action === "Add a department") {
        addDepartment();
      }
      if (answers.action === "View all roles") {
        viewRole();
      }
      if (answers.action === "Add a role") {
        addRole();
      }
      if (answers.action === "View all employees") {
        viewEmployees();
      }
      if (answers.action === "Add an employee") {
        addEmployee();
      }
      if (answers.action === "Update an employee role") {
        updateEmployee();
      }

      //

      function viewRole() {
        connectionLevels.query("SELECT * FROM role", (err, results) => {
          if (err) {
            return console.log(err.message);
          }
          console.table(results);
          mainMenu();
          return results;
        });
      };

      async function addRole() {
        await inquirer
          .prompt([
            {
              name: "title",
              type: "input",
              message: "Please add the new role!",
            },
            {
              name: "salary",
              type: "input",
              message: "What is the salary of the new salary?",
            },
            {
              name: "department_id",
              type: "input",
              message: "Enter the department ID of this new role",
            },
          ])
          .then((answers) => {
            const role = answers.title;
            const salary = answers.salary;
            const department_id = answers.department_id;
            
            connectionLevels.query(
              `INSERT INTO role (title, salary, department_id) VALUES ('${role}', ${salary}, ${department_id})`,
              (err, results) => {
                if (err) {
                  return console.log(err.message);
                }
                console.table(results);
                mainMenu();
                return results;
              }
            );

            console.table(results);
            mainMenu();
          });
      }

      function addDepartment() {
        inquirer 
        .prompt ({
            type: "input",
            name: "newDepartment",
            message: "Enter a name for the new department!"

        }).then ((answers) => {
            
            const newDepartment = answers.newDepartment
            connectionLevels.query(
                `INSERT INTO department (name) VALUES ("${newDepartment}")`,
              
                (err, results) => {
                  if (err) {
                    return console.log(err.message);
                  }
                  console.table(results);
                  mainMenu();
                  return results;
                }
              );
        })

        
      };

      function viewEmployees() {
        return connectionLevels.query(
          "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, manager_id FROM employee",
          (err, results) => {
            if (err) {
              return console.log(err.message);
            }
            console.table(results);
            mainMenu();
            return results;
          }
        );
      };

      async function addEmployee() {
        await inquirer
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
            console.log(answers);
            connectionLevels.query(
              `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', ${role_id}, ${manager_id});`,
              (err, results) => {
                if (err) throw err;
                mainMenu();
                return results;
              }
            );
          });
      }

      function viewDepartments() {
        return connectionLevels.query(
          "SELECT * FROM department",
          (err, results) => {
            if (err) {
              return console.log(err.message);
            }

            console.table(results);
            mainMenu();
            return results;
          }
        );
      };

    function updateEmployee() {
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
            const EmployeeUpdate = answers.EmployeeUpdate;
            const updateRole = answers.UpdateRole;
            console.log(answers)
            
            connectionLevels.query(
              `UPDATE employee SET role_id = '${updateRole}' WHERE id = '${EmployeeUpdate}'`,
              (err, results) => {
                if (err) {
                  return console.log(err.message);
                }
    
                console.table(results);
                mainMenu();
                return results;
              }
            );
          });
    }});
}

// function display() {
    
// }


mainMenu();
