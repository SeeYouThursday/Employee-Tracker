require("dotenv").config();
const inquirer = require("inquirer");
require("dotenv").config();
const { checkingQuit, whichQuery } = require("./assets/js/dbfunc");
const mysql = require("mysql2");

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
];

inquirer.prompt(questions).then((answers) => {
  console.log(answers);
  // checkingQuit(answers, questions);
  whichQuery(answers, questions);
  //CREATE QUERY BASED ON ANSWER
});

//when I select any view, a table will be displayed based on the query
//then, the user will be prompted again with with "What would you like to do?"

module.exports = questions;
