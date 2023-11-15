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
        type: "number",
        name: "deptId",
        message: "What is the department ID for this role?",
        prefix: "Look at the above table to find the department ID.\n",
      },
    ])
    .then(async (answer) => {
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

const addEmployee = async () => {
  // Add an employee
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
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "input",
        name: "roleId",
        message: "What is the employee's role ID?",
        prefix: "Look at the above table to find the role ID.\n",
      },
      {
        input: "confirm",
        name: "managerCheck",
        message: "Is this new employee a manager? (Y/N)",
        validate: (answers) =>
          answers.managerCheck !== "y" || answers.managerCheck !== "n"
            ? true
            : console.log("\nPlease type Y or N to respond."),
      },
      {
        input: "input",
        name: "managerId",
        message: "What is the id of the new employee's manager?",
        when: (answers) => answers.managerCheck == "n",
        prefix:
          "Look at the above table to find the manager ID of the new employee's manager.\n",
      },
    ])
    .then(async (answer) => {
      try {
        await db.query("INSERT INTO employees SET ?", {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleId,
          manager_id: answer.managerId,
        });
        console.log("Employee added successfully!");
      } catch (err) {
        console.error(err);
      }
    });
};

const addDepartment = async () => {
  // Add a department
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
        name: "deptName",
        message: "What is the name of the department?",
      },
    ])
    .then(async (answer) => {
      try {
        await db.query("INSERT INTO department SET ?", {
          name: answer.deptName,
        });
        console.log("Department added successfully!");
      } catch (err) {
        console.error(err);
      }
    });
};

const updateEmployee = async () => {
  // Update an employee
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
        name: "employeeId",
        message: "What is the ID of the employee you want to update?",
      },
      {
        type: "input",
        name: "roleId",
        message: "What is the new role ID for this employee?",
      },
    ])
    .then(async (answer) => {
      try {
        await db.query(
          "UPDATE employees SET role_id = ? WHERE id = ?",
          [answer.roleId, answer.employeeId],
          function (err, results) {
            if (err) throw err;
            console.log("Employee updated successfully!");
          }
        );
      } catch (err) {
        console.error(err);
      }
    });
};

module.exports = { addRole, addEmployee, addDepartment };
