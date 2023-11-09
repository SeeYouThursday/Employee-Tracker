const inquirer = require("inquirer");

questions = [
  {
    type: "rawlist",
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
  //CREATE QUERY BASED ON ANSWER
});

//when I select any view, a table will be displayed based on the query
//then, the user will be prompted again with with "What would you like to do?"
