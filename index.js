const inquirer = require("inquirer");
const mysql = require("mysql2");
const ct = require("console.table");

// const {
//   createEmployee,
//   createRole,
//   createDepartment,
//   updateRole,
//   getRoles,
//   getAllDepartments,
//   getAllEmployees,
// } = require("./db");
const connection = require("./db/connection");

function init() {
  inquirer
    .prompt([
      {
        message: "What would you like to do?",
        name: "action",
        type: "list",
        choices: [
          "Create a new employee",
          "Create a new role",
          "Create a new Department",
          "Update employee roles",
          "View all roles",
          "View all departments",
          "View all employees",
          "Exit",
        ],
      },
    ])
    .then(function (selection) {
      switch (selection.action) {
        case "Create a new employee":
          createEmployee();
          break;
        case "Create a new role":
          createRole();
          break;
        case "Create a new department":
          createDepartment();

          break;
        case "Update employee roles":
          updateRole();
          break;
        case "View all roles":
          getRoles();
          break;
        case "View all departments":
          getAllDepartments();
          break;
        case "View all employees":
          getAllEmployees();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}
function getAllDepartments() {
  connection.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}
function getRoles() {
  connection.query(`SELECT * FROM role`, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}
function getAllEmployees() {
  connection.query(`SELECT * FROM employee`, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}
function createDepartment() {
  console.log("made it to the createdept function");
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Department name: ",
      },
    ])
    .then(function (response) {
      connection.query(
        `INSERT INTO department(name) VALUES ("${response.dapartmentName}")`,
        (err, res) => {
          console.log(err);
          init();
        }
      );
    });
}
function createRole() {
  connection.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "roleName",
          messsage: "Name role: ",
        },
        {
          type: "input",
          name: "salary",
          message: "Enter salary for role: ",
        },
        {
          type: "list",
          name: "departmentId",
          message: "Select department for new role",
          choices: res.map((department) => department.name),
        },
      ])
      .then(function (response) {
        const getDeptartmentId = res.find(
          (department) => department.name === response.departmentId
        );

        connection.query(`INSERT INTO role SET ?`, {
          title: response.roleName,
          salary: response.salary,
          department_id: getDeptartmentId.id,
        });
        init();
      });
  });
}
function createEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Employees first name: ",
        name: "firstName",
      },
      {
        type: "input",
        message: "Employees last name: ",
        name: "lastName",
      },
      {
        type: "input",
        message: "What is their role ID? ",
        name: "role",
      },
      {
        type: "input",

        message: "What is their manager ID?",
        name: "manager",
      },
    ])
    .then(function (selection) {
      const firstName = selection.firstName;
      const lastName = selection.lastName;
      const manager = selection.manager;
      const role = selection.role;
      connection.query(`INSERT INTO employee SET ?`, {
        first_name: firstName,
        last_name: lastName,
        role_id: role,
        manager_id: manager,
      });
      init();
    });
}
init();
function updateRole() {
  let employees = `SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.title FROM employee, role WHERE role.id = employee.role_id`;

  connection.query(employees, (err, data) => {
    inquirer
      .prompt([
        {
          name: "name",
          type: "list",
          message: "Choose an employee to update",
          choices: data.map((employees) => ({
            name: employees.first_name,
            value: employees.id,
          })),
        },
        {
          name: "newRole",
          type: "input",
          message: "Enter the employee's new role",
        },
      ])
      .then((answer) => {
        connection.query(
          `UPDATE employee SET role_id = "${answer.newRole}" WHERE id = "${answer.name}"`,
          (err, result) => {
            console.log(err);
            init();
          }
        );
      });
  });
}
