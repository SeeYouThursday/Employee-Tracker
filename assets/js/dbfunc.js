const inquirer = require("inquirer");

function whichQuery(answers) {
  switch (answers) {
    case "view all departments":
    //dept table query
    case "view all roles":
    // roles table query
    case "view all employees":
    // employee table query
    case "add a department":
    // Insert dept to department table
    case "add a role":
    //insert role into role_table
    case "add an employee":
    case "update an employee role":
    default:
  }
}

//loop through the answers, if the answer is not 'Quit', then return the prompt question

const checkingQuit = (answers, questions) =>
  answers.quit === true ? console.log(`Bye!`) : inquirer.prompt(questions);

module.exports = checkingQuit;
