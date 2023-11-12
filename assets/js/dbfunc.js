const inquirer = require("inquirer");
const mysql = require("mysql2");
const querythis = require("./queries");
const questions = require("../../index");

const { user, password, database } = process.env;

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

function whichQuery(answers) {
  console.log("switch check", answers.options);
  switch (answers.options) {
    case "view all departments":
      querythis("SELECT * FROM department", questions);
    // continueQuestions(questions);
    //dept table query
    case "view all roles":
      querythis("SELECT * FROM role_table", answers, questions);
    // roles table query
    case "view all employees":
      // employee table query
      querythis("SELECT * FROM employees", answers, questions);
    case "add a department":
    // Insert dept to department table
    case "add a role":
    //insert role into role_table
    //constructor to handle this?
    case "add an employee":
    //constructor to handle this?
    case "update an employee role":
    //constructor to handle this?
    case "quit":
      console.log(`Bye!`);
    // checkingQuit(answers, questions);
    default:
  }
}

//loop through the answers, if the answer is not 'Quit', then return the prompt question

module.exports = { whichQuery };
