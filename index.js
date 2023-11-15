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
  //Add a new Department Question
  // {
  //   input: "text",
  //   name: "department",
  //   message: "Enter a new department.",
  //   when: (answers) => answers.options === "add a department",
  // },
  //Add a new Role Questions

  //Add a new Employee Questions
  // {
  //   input: "text",
  //   name: "first",
  //   message: "Enter the new employee's first name.",
  //   when: (answers) => answers.options === "add an employee",
  // },
  // {
  //   input: "text",
  //   name: "last",
  //   message: "Enter the new employee's last name.",
  //   when: (answers) => answers.options === "add an employee",
  // },
  // //employee's role
  // {
  //   //TODO CHOICES ARRAY USING MYSQL2
  //   input: "list",
  //   name: "role",
  //   message: "Select the new employee's role:",
  //   choices: [],
  //   when: (answers) => answers.options === "add an employee",
  // },
  // {
  //   input: "confirm",
  //   name: "managerCheck",
  //   message: "Is this new employee a manager? (Y/N)",
  //   when: (answers) => answers.options === "add an employee",
  //   validate: (answers) =>
  //     answers.managerCheck !== "y" || answers.managerCheck !== "n"
  //       ? true
  //       : console.log("\nPlease type Y or N to respond."),
  // },
  // {
  //   input: "list",
  //   name: "manager",
  //   message: "What is the id of the new employee's manager?",
  //   choices: [],
  //   when: (answers) => answers.managerCheck === true,
  // },
];

const quitHandler = (answers) =>
  answers.options === "quit" ? process.exit() : askQuestions();

//RECURSIVE FUNCT TO CHECK TO SEE IF QUIT IS SELECTED, OTHERWISE CONTINUE ASKING QUESTIONS
async function askQuestions() {
  inquirer.prompt(questions).then((answers) => {
    whichQuery(answers);
    // quitHandler(answers);
  });
}

askQuestions();

module.exports = askQuestions;
