DROP DATABASE employee-trackersDB

CREATE DATABASE employee-trackersDB

USE employee_trackersDB;


CREATE TABLE department (
    id NOT NULL AUTO_INCREMENT,
    name NOT NULL VARCHAR(30),
    PRIMARY KEY (id),
)

CREATE TABLE role (
    id NOT NULL AUTO_INCREMENT,
    title NOT NULL VARCHAR(30),
    salary NOT NULL,
    department NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department)    
)

CREATE TABLE employee (
id NOT NULL AUTO_INCREMENT
first_name NOT NULL VARCHAR(30), 
last_name NOT NULL VARCHAR(30),
role_id NOT NULL
manager_id 
)