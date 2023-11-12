require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");

//Deconstructing the .env file for readability
const { user, password, database } = process.env;

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
    user: user,
    // MySQL password
    password: password,
    database: database,
  },
  console.log(`Connected to the ${database} database.`)
);

// Default Response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
