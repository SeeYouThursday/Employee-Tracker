const querythis = require("./queries");

async function whichQuery(answers) {
  switch (answers.options) {
    case "view all departments":
      await querythis("SELECT * FROM department");
      //dept table query
      break;
    case "view all roles":
      await querythis("SELECT * FROM role_table");
      // roles table query
      break;
    case "view all employees":
      // employee table query
      await querythis("SELECT * FROM employees");
      break;
    // askQuestions();
    case "add a department":
      // Insert dept to department table
      await querythis(
        `INSERT INTO department (NAME) VALUES ("${answers.newdept}")`,
        answers,
        questions
      );
      break;
    case "quit":
      console.log(`Bye!`);
      break;
    default:
      console.log("Invalid Input");
  }
}

module.exports = { whichQuery };
