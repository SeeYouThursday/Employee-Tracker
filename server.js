require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");

//Indicate the port and create an instance of express
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false })); // do I need to use this?
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: process.env.password,
    database: "employee_db",
  },
  console.log(`Connected to the employees_db database.`)
);

async function testingQuery(sql) {
  // const sql = ""; //sql query
}

// with placeholder
// connection.query(

//   sql,

//   Thing to pass into the placeholder,
//   function (err, results) {
//     console.log(results);
//   }
// );

// Default Response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
