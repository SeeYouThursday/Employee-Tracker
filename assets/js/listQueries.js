require("dotenv").config();

const { user, password, database } = process.env;

const listOptions = async (sql) => {
  const mysql = require("mysql2/promise");

  const db = await mysql.createConnection({
    host: "localhost",
    user: user,
    password: password,
    database: database,
    rowsAsArray: true,
  });

  try {
    const [results, fields] = await db.execute(sql);
    return results.flatMap((result) => result[0]);
  } catch (err) {
    // handle error
    console.error(err);
  }
};

module.exports = { listOptions };
