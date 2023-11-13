require("dotenv").config();
const inquirer = require("inquirer");
const mysql = require("mysql2");
//Importing from project files
const Add = require("./add-update");
const { whichQuery } = require("./assets/js/dbfunc");

//Deconstructing the .env file for readability
const { user, password, database } = process.env;

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: user,
    // MySQL password
    password: password,
    database: database,
  },
  console.log(`Connected to the ${database} database.`)
);

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
  //TODO conditional questions for adding roles/dept/employees
  {
    input: "text",
    name: "newDept",
    message: "Enter a new department.",
    when: (answers) => (answers.options === "add a department" ? true : false),
  },
  {
    input: "text",
    name: "newRole",
    message: "Enter a new role.",
    when: (answers) => (answers.options === "add a role" ? true : false),
  },
  //salary for role
  {
    input: "text",
    name: "salary",
    message: "Enter the salary for this role:",
    when: (answers) => (answers.newRole !== undefined ? true : false),
  },
  // department id for role
  {
    input: "text",
    name: "dept",
    message: "Enter the dept id for this role:",
    when: (answers) => (answers.newRole !== undefined ? true : false),
  },
  // new Add(
  //   "number",
  //   "dept_id",
  //   "Enter the dept id for this role:",
  //   `(answers) => (answers.newRole !== null ? true : false)`
  // ),
  {
    input: "text",
    name: "employee",
    message: "Enter a new employee.",
    when: (answers) => (answers.options === "add an employee" ? true : false),
  },
];

const quitChecker = (answers) =>
  answers.options === "quit" ? process.exit() : askQuestions();

//RECURSIVE FUNCT TO CHECK TO SEE IF QUIT IS SELECTED, OTHERWISE CONTINUE ASKING QUESTIONS
const askQuestions = async () => {
  inquirer.prompt(questions).then(async (answers) => {
    await whichQuery(answers);

    await quitChecker(answers);
  });
};

askQuestions();

module.exports = askQuestions;
