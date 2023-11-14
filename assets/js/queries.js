require("dotenv").config();
const mysql = require("mysql2/promise");
const { printTable } = require("console-table-printer");

const { user, password, database } = process.env;

////uses the results, not fields
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

//! JOIN AND QUERY HANDLER BOTH HAVE THE SAME FUNCTION
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

////uses the fields, not results
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
    const [fields] = await db.execute(sql);
    // use results and fields here
    // await console.log("these", results);
    console.table(fields);
    // successStatement(); //! Caused an error
  } catch (err) {
    // handle error
    console.error(err);
  }
}

// const successStatement = () => {
//   {
//     if (!err) {
//       console.log("Successfully added!");
//     }
//   }
// };

module.exports = { queryHandler, joinHandler, insertHandler };
