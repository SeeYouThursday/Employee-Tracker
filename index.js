require("dotenv").config();
const inquirer = require("inquirer");
const mysql = require("mysql2");

//Importing from project files
// const Add = require("./add-update");
const whichQuery = require("./assets/js/dbfunc");

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
  //Add a new Department Question
  {
    input: "text",
    name: "department",
    message: "Enter a new department.",
    when: (answers) => answers.options === "add a department",
  },
  //Add a new Role Questions
  {
    input: "text",
    name: "title",
    message: "Enter a new role.",
    when: (answers) => answers.options === "add a role",
  },
  //salary for role
  {
    input: "text",
    name: "salary",
    message: "Enter the salary for this role:",
    when: (answers) => answers.options === "add a role",
  },
  // department id for role
  // TODO: display  dept names to choose from?
  {
    input: "text",
    name: "dept_id",
    message: "Enter the dept id for this role:",
    when: (answers) => answers.options === "add a role",
  },
  //Add a new Employee Questions
  {
    input: "text",
    name: "first",
    message: "Enter the new employee's first name.",
    when: (answers) => answers.options === "add an employee",
  },
  {
    input: "text",
    name: "last",
    message: "Enter the new employee's last name.",
    when: (answers) => answers.options === "add an employee",
  },
  //employee's role
  {
    input: "number",
    name: "role",
    message: "Enter the new employee's role:",
    when: (answers) => answers.options === "add an employee",
  },
  {
    input: "confirm",
    name: "managerCheck",
    message: "Is this new employee a manager?",
    when: (answers) => answers.options === "add an employee",
  },
  {
    //TODO: needs revision here - shows keep going even when not prompted for confirm
    input: "number",
    name: "manager",
    message: "What is the id of the new employee's manager?",
    when: (answers) => answers.managerCheck !== true,
  },
];

const quitHandler = (answers) =>
  answers.options === "quit" ? process.exit() : askQuestions();

//RECURSIVE FUNCT TO CHECK TO SEE IF QUIT IS SELECTED, OTHERWISE CONTINUE ASKING QUESTIONS
const askQuestions = async () => {
  const answers = await inquirer.prompt(questions);
  await whichQuery(answers);
  await quitHandler(answers); //exit the prompts if user selects quit, otherwise, display questions again
};

askQuestions();
