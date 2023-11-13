const { queryHandler, joinHandler, insertHandler } = require("./queries");
const { printTable } = require("console-table-printer");

async function whichQuery(answers) {
  switch (answers.options) {
    case "view all departments":
      await queryHandler("SELECT * FROM department");
      //dept table query
      break;
    case "view all roles":
      await queryHandler("SELECT * FROM role_table");
      // roles table query
      break;
    case "view all employees":
      // employee table query
      await queryHandler("SELECT * FROM employees");
      break;
    // askQuestions();
    case "add a department":
      // Insert dept to department table
      //This does insert into the table, the table has trouble rendering afterwards (although not required)
      const newDept = answers.department;
      const deptSql = `INSERT INTO department (name) VALUES ("${newDept}");`;
      console.log(deptSql);
      await insertHandler(deptSql);
      await queryHandler("SELECT * FROM department");
      break;
    case "add a role":
      // Insert dept to department table
      // await joinHandler()
      break;
    case "add an employee":
      // Insert dept to department table
      await joinHandler(
        "INSERT INTO department (name) values(`${answers.department}`)"
      );
      await queryHandler("SELECT * FROM department");
      break;
    case "quit":
      console.log(`Bye!`);
      break;
    default:
      console.log("Invalid Input");
  }
}

module.exports = whichQuery;
