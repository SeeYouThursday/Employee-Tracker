const inquirer = require("inquirer");

questions = [
  {
    type: "rawlist",
    name: "view-depts",
    message: "What would you like to do?",
    choices: [
      "view all departments",
      "view all roles",
      "view all employees",
      "add a department",
      "add a role",
      "add an employee",
      "update an employee role",
    ],
  },
];
