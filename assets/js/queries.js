require("dotenv").config();
const mysql = require("mysql2/promise");
const { printTable } = require("console-table-printer");
// const inquirer = require("inquirer");
// const questions = require("../../index");
// const { continueQuestions } = require("./dbfunc");

const { user, password, database } = process.env;

// const db = mysql.createConnection(
//   {
//     host: "localhost",
//     user: user,
//     password: password,
//     database: database,
//   },
//   console.log(`Connected to the ${database} database.`)
// );

// async function continueQuestions(questions) {
//   await inquirer.prompt(questions);
// }

async function querythis(sql, questions) {
  // await checkingQuit(answers);
  const db = await mysql.createConnection(
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

  try {
    const [results, fields] = await db.execute(sql);
    // use results and fields here
    console.log(results, fields);
    printTable(results);
    // await continueQuestions(questions);
  } catch (err) {
    // handle error
    console.error(err);
  }
}

//may not use
async function specificQuery(sql, param) {
  const mysql = require("mysql2/promise");
  // create the connection
  const db = await mysql.createConnection({
    host: "localhost",
    user: user,
    password: password,
    database: database,
  });

  await db.query(sql, param, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
}

module.exports = querythis;
