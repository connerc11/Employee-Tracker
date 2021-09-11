USE employee_trackersDB
INSERT INTO department(name) VALUES("Accounting"),("HR"),("Sales"),("Engineering");
INSERT INTO role(title, salary, department_id) VALUES("Accountant", 50000, 1),("HR VP", 60000, 2),("SALESMAN/SALESWOMAN", 50000, 3),("Engineer", 70000, 4);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Ted", "Peters", 2, NULL), ("Valeria", "Sanchez", 1, 1), ("Micheal", "Harris", 4, 1), ("Sarah", "Richards", 3, 3);
