const { isNull } = require("util");
const { queryHandler, joinHandler } = require("./queries");
const { printTable } = require("console-table-printer");
const { addRole, addDepartment, addEmployee } = require("./questions");
const askQuestions = require("../../index");

// ?? Consider Refactoring

async function whichQuery(answers) {
  switch (answers.options) {
    case "view all departments":
      await queryHandler("Select name AS Department from department;");
      //dept table query
      break;
    case "view all roles":
      //TODO: change to a JOINHANDLER
      await queryHandler(`SELECT 
      role_table.id as ID,
      role_table.salary AS Salary, 
      role_table.title AS "Job Title", 
      department.name AS Department
  FROM 
      role_table
  LEFT JOIN 
      department
  ON 
      role_table.department_id = department.id;`);
      // roles table query
      break;
    case "view all employees":
      // employee table query
      await joinHandler(`SELECT 
      e.id, 
      e.first_name AS "First Name", 
      e.last_name AS "Last Name", 
      role_table.salary AS Salary, 
      role_table.title AS "Job Title", 
      CONCAT(m.first_name, ' ', m.last_name) AS Manager,
      department.name AS Department
  FROM employees e
  JOIN role_table 
  ON role_table.id = e.role_id
  LEFT JOIN employees m
  ON e.manager_id = m.id
  LEFT JOIN department
  ON role_table.department_id = department.id;`);
      break;
    // askQuestions();
    case "add a department":
      // Insert dept to department table
      addDepartment();
      break;
    case "add a role":
      // Display the dept table to help answer which dept the new role belongs to
      await queryHandler(`SELECT name AS Department, id FROM department;`);

      await addRole();
      process.exit();
    // await askQuestions();
    case "add an employee":
      // Display the role table to help answer which role the new employee belongs to
      await queryHandler(`SELECT * from role_table;`);
      // Display the employee table's manager info to help answer which manager the new employee belongs to
      await queryHandler(`SELECT 
      CONCAT(m.first_name, ' ', m.last_name) AS Manager, e.manager_id FROM employees e
      JOIN employees m
      ON e.manager_id = m.id;`);
      //Ask Employee Questions and insert into employee table
      await addEmployee();
      process.exit();
    case "update an employee":
      //TODO UPDATE HERE!
      // Display the employee table to help answer which employee to update
      await queryHandler(`SELECT 
      CONCAT(m.first_name, ' ', m.last_name) AS Manager, e.manager_id FROM employees e
      JOIN employees m
      ON e.manager_id = m.id;`);
      break;
    case "quit":
      console.log(`Bye!`);
      break;
    default:
      console.log("Invalid Input");
  }
}

module.exports = whichQuery;
