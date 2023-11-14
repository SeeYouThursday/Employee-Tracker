require("dotenv").config();
const inquirer = require("inquirer");
const mysql = require("mysql2");

//Importing from project files
// const Add = require("./add-update");
const whichQuery = require("./assets/js/dbfunc");
const { listOptions } = require("./assets/js/listQueries");

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

const quitHandler = (answers) =>
  answers.options === "quit" ? process.exit() : askQuestions();

//RECURSIVE FUNCT TO CHECK TO SEE IF QUIT IS SELECTED, OTHERWISE CONTINUE ASKING QUESTIONS
const askQuestions = async () => {
  const roleList = await listOptions(`SELECT title FROM role_table;`);

  const deptList = await listOptions(
    `Select name AS Department from department;`
  );

  const managerList = await listOptions(
    `SELECT 
    CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employees e
    LEFT JOIN employees m
    ON e.manager_id = m.id;`
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
      input: "number",
      name: "salary",
      message: "Enter the salary for this role:",
      when: (answers) => answers.options === "add a role",
      // validate: (answers) =>
      //   typeof answers.salary === "number" ? true : false,
    },
    // department for role
    {
      //TODO CHOICES ARRAY USING MYSQL2
      input: "checklist",
      name: "dept_id",
      message: "Enter the dept for this role",
      choices: deptList,
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
      //TODO CHOICES ARRAY USING MYSQL2
      input: "list",
      name: "role",
      message: "Select the new employee's role:",
      choices: roleList,
      when: (answers) => answers.options === "add an employee",
    },
    {
      input: "confirm",
      name: "managerCheck",
      message: "Is this new employee a manager? (Y/N)",
      when: (answers) => answers.options === "add an employee",
      validate: (answers) =>
        answers.managerCheck !== "y" || answers.managerCheck !== "n"
          ? true
          : console.log("\nPlease type Y or N to respond."),
    },
    {
      input: "list",
      name: "manager",
      message: "What is the id of the new employee's manager?",
      choices: managerList,
      when: (answers) => answers.managerCheck === true,
    },
  ];

  return inquirer.prompt(questions);
  //exit the prompts if user selects quit, otherwise, display questions again
};

askQuestions().then((answers) => {
  whichQuery(answers).then((answers) => {
    quitHandler(answers);
  });
});
