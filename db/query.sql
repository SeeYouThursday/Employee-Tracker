USE employees_db;



-- SELECT e.id, e.first_name, e.last_name, role_table.salary, role_table.title, role.dept_id
-- CONCAT(m.first_name," ", m.last_name) AS Manager FROM employees e
-- JOIN role_table 
-- ON role_table.id = e.role_id
-- LEFT JOIN employees m
-- ON e.manager_id = m.id
-- LEFT JOIN department
-- ON role_table.dept_id = department.id;

--create instances of tables by putting a letter after the table, then referencing them with that letter/variable
--TODO: TRANSFER TO DBFUNC.JS
SELECT 
    e.id, 
    e.first_name AS "First Name", 
    e.last_name AS "Last Name", 
    role_table.salary AS Salary, 
    role_table.title AS JobTitle, 
    CONCAT(m.first_name, ' ', m.last_name) AS Manager,
    department.name AS Department
FROM employees e
JOIN role_table 
ON role_table.id = e.role_id
LEFT JOIN employees m
ON e.manager_id = m.id
LEFT JOIN department
ON role_table.department_id = department.id;
--sorted based on salary currently

SELECT title FROM role_table;

Select name AS Department from department;

SELECT 
CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employees e
LEFT JOIN employees m
ON e.manager_id = m.id;