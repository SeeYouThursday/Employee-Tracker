// require("dotenv").config();
const inquirer = require("inquirer");
const whichQuery = require("./assets/js/dbfunc");

const questions = [
  {
    type: "list",
    name: "options",
    message: "What would you like to do?",
    choices: [
      "view all departments",
      "view all roles",
      "view all employees",
      "add a department",
      "add a role",
      "add an employee",
      "update employee role",
      "quit",
    ],
  },
];

async function askQuestions() {
  inquirer.prompt(questions).then(async (answers) => {
    await whichQuery(answers);
    //RECURSIVE FUNCT TO CHECK TO SEE IF QUIT IS SELECTED, OTHERWISE CONTINUE ASKING QUESTIONS
    const quitHandler = async (answers) =>
      answers.options === "quit" ? process.exit() : await askQuestions();
    quitHandler(answers);
  });
}
askQuestions();

module.exports = askQuestions;
