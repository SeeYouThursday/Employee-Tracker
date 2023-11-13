const { isNull } = require("util");
const { queryHandler, joinHandler, insertHandler } = require("./queries");
const { printTable } = require("console-table-printer");
const cTable = require("console.table");

async function whichQuery(answers) {
  switch (answers.options) {
    case "view all departments":
      await queryHandler("SELECT * FROM department");
      //dept table query
      break;
    case "view all roles":
      //TODO: change to a JOINHANDLER
      await queryHandler("SELECT * FROM role_table");
      // roles table query
      break;
    case "view all employees":
      // employee table query
      //TODO: change to a JOINHANDLER
      await queryHandler("SELECT * FROM employees");
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
      // Insert role to role_table table
      const { title, salary, dept_id } = answers;
      const roleSql = `INSERT INTO role_table (title, salary, department_id) VALUES ("${title}", ${salary}, ${dept_id});`;

      console.log(roleSql);
      await insertHandler(roleSql);
      //TODO: change to a JOINHANDLER
      await queryHandler("SELECT * FROM role_table");
      break;

    case "add an employee":
      // Insert dept to department table
      const { first, last, role, managerCheck } = answers;
      let manager = "NULL";
      const managerHere = () =>
        !managerCheck
          ? console.log(`I'M THE CAPTAIN NOW!`)
          : (manager = answers.manager);
      managerHere();
      const employeeSql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${first}", "${last}", ${role}, ${manager});`;

      await insertHandler(employeeSql);
      await queryHandler("SELECT * FROM employees");
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
