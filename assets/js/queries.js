require("dotenv").config();
const mysql = require("mysql2/promise");
const { printTable } = require("console-table-printer");

const { user, password, database } = process.env;

async function querythis(sql) {
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
    const [results] = await db.execute(sql);
    // use results and fields here
    // console.log("these", results);
    printTable(results);
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
