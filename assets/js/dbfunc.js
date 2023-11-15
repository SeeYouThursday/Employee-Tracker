const { isNull } = require("util");
const { queryHandler, joinHandler, insertHandler } = require("./queries");
const { printTable } = require("console-table-printer");
// const { listOptions } = require("./listQueries");
const addRole = require("./questions");
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
      const newDept = answers.department;
      const deptSql = `INSERT INTO department (name) VALUES ("${newDept}");`;
      console.log(deptSql);
      await insertHandler(deptSql);
      await queryHandler("SELECT * FROM department");
      break;
    case "add a role":
      // Display the dept table to help answer which dept the new role belongs to
      const dept = await queryHandler(
        `SELECT name AS Department, id FROM department;`
      );
      await addRole();
      process.exit();
    // await askQuestions();
    case "add an employee":
      await queryHandler(`SELECT * from role_table;`);
      const { first, last, role, managerCheck } = answers;
      // Insert handle NULLs in manager
      let manager = "NULL";
      const managerHere = () => {
        if (!managerCheck) {
          console.log(`I'M THE CAPTAIN NOW!`);
        } else {
          manager = answers.manager;
        }
      };
      managerHere();
      const employeeSql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${first}", "${last}", ${role}, ${manager});`;

      await insertHandler(employeeSql);

      const querySql = `SELECT e.id, e.first_name, e.last_name, role_table.salary, role_table.title,
      CONCAT(m.first_name," ", m.last_name)  AS Manager FROM employees e
      JOIN role_table 
      ON role_table.id = e.role_id
      LEFT JOIN employees m
      ON e.manager_id = m.id;`;
      await queryHandler(querySql);
      break;
    case "update an employee":
      //TODO UPDATE HERE!
      break;
    case "quit":
      console.log(`Bye!`);
      break;
    default:
      console.log("Invalid Input");
  }
}

module.exports = whichQuery;
