require("dotenv").config();
const inquirer = require("inquirer");
const { user, password, database } = process.env;
const mysql = require("mysql2/promise");

const addRole = async () => {
  // Add a role
  const db = await mysql.createConnection({
    host: "localhost",
    user: user,
    password: password,
    database: database,
  });

  await inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "What is the name of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this role?",
      },
      {
        type: "input",
        name: "deptId",
        message: "What is the department ID for this role?",
      },
    ])
    .then(async (answer) => {
      console.log("Running the .then() block");
      console.log("answer:", answer);
      try {
        await db.query("INSERT INTO role_table SET ?", {
          title: answer.roleName,
          salary: answer.salary,
          department_id: answer.deptId,
        });
        console.log("Role added successfully!");
      } catch (err) {
        console.error(err);
      }
    });
};

// const addEmployee = async () => {
//   // Add an employee
//   const db = await mysql.createConnection({
//     host: "localhost",
//     user: user,
//     password: password,
//     database: database,
//   });

//   await inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "firstName",
//         message: "What is the employee's first name?",
//       },
//       {
//         type: "input",
//         name: "lastName",
//         message: "What is the employee's last name?",
//       },
//       {
//         type: "input",
//         name: "roleId",
//         message: "What is the employee's role ID?",
//       },
//       {
//         type: "input",
//         name: "managerId",
//         message: "What is the employee's manager ID?",
//       },
//     ])
//     .then(async (answer) => {
//       tryawait db.query(
//         "INSERT INTO employees SET ?",
//         {
//           first_name: answer.firstName,
//           last_name: answer.lastName,
//           role_id: answer.roleId,
//           manager_id: answer.managerId,
//         },
//         (err) => {
//           if (err) throw err;
//           console.log("Employee added successfully!");
//         }
//       );
//     });
// };

module.exports = addRole;
