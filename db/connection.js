// Import and require mysql2
const mysql = require("mysql2");
const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const connection = mysql.createConnection(
  {
    host: "127.0.0.1",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "",
    database: "employees",
  },
  console.log(`Connected to the employees database.`)
);

connection.connect(function (err) {
  if (err) throw err;
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = connection;
