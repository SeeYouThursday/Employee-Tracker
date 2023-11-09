DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;


DROP TABLE IF EXISTS department;

CREATE TABLE department (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
    -- PRIMARY KEY(id)
);

DROP TABLE IF EXISTS role_table;

CREATE TABLE role_table (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY(department_id) REFERENCES department(ID)
);

DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    FOREIGN KEY(role_id) REFERENCES role_table(id),
    manager_id INT,
    FOREIGN KEY(manager_id) REFERENCES employees(ID)
);