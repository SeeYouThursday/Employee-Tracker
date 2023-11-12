require("dotenv").config();
const inquirer = require("inquirer");
require("dotenv").config();
const { whichQuery } = require("./assets/js/dbfunc");
const mysql = require("mysql2");
const Add = require("./add-update");
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

questions = [
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
    suffix: "Department Added!",
  },
  {
    input: "text",
    name: "newRole",
    message: "Enter a new role.",
    when: (answers) => (answers.options === "add a role" ? true : false),
  },
  //salary for role
  new Add(
    "text",
    "salary",
    "Enter the salary for this role",
    `${(answers) => (answers.newRole !== "" ? true : false)}`
  ),
  // department id for role
  new Add(
    "number",
    "dept_id",
    "Enter the dept id for this role:",
    `(answers) => (answers.newRole !== null ? true : false)`
  ),
  {
    input: "text",
    name: "employee",
    message: "Enter a new employee.",
    when: (answers) => (answers.options === "add an employee" ? true : false),
  },
  {
    input: "text",
    name: "role",
    message: "Enter a new role.",
    when: (answers) => (answers.options === "add a role" ? true : false),
  },
];

inquirer.prompt(questions).then((answers) => {
  console.log(answers);
  // checkingQuit(answers, questions);
  // whichQuery(answers, questions);
  //CREATE QUERY BASED ON ANSWER
});

//when I select any view, a table will be displayed based on the query
//then, the user will be prompted again with with "What would you like to do?"

module.exports = questions;
