require("dotenv").config();
const mysql = require("mysql2/promise");
// const { printTable } = require("console-table-printer");

const { user, password, database } = process.env;

async function queryHandler(sql) {
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
async function joinHandler(sql) {
  const mysql = require("mysql2/promise");
  // create the connection
  const db = await mysql.createConnection({
    host: "localhost",
    user: user,
    password: password,
    database: database,
  });

  try {
    const [results] = await db.execute(sql);
    // use results and fields here
    console.log("these", results);
    printTable(results);
  } catch (err) {
    // handle error
    console.error(err);
  }
}

async function insertHandler(sql) {
  const mysql = require("mysql2/promise");
  // create the connection
  const db = await mysql.createConnection({
    host: "localhost",
    user: user,
    password: password,
    database: database,
  });

  try {
    const [results, fields] = await db.execute(sql);
    // use results and fields here
    // await console.log("these", results);
    await console.table(fields);
    // await successStatement(err); //! Caused an error
  } catch (err) {
    // handle error
    console.error(err);
  }
}

const successStatement = (err) => {
  {
    if (!err) {
      console.log("Successfully added!");
    }
  }
};

module.exports = { queryHandler, joinHandler, insertHandler };
