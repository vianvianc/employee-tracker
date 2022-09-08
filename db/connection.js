// Import and require mysql2
const mysql = require("mysql2");

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
module.exports = connection;
