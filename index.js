const inquirer = require("inquirer");
const mysql = require("mysql");
const connection = require("./db/connection");

function init() {
  inquirer.prompt([
    {
      name: "",
    },
  ]);
}
