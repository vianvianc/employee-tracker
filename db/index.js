const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }
  getAllEmployees() {
    return this.connection.promise().query("");
  }
  getRoles() {
    return this.connection.promise().query("");
  }
  getAllDepartments() {
    return this.connection.promise().query("");
  }
  createDepartment() {
    return this.connection.promise().query("");
  }
  createRole() {
    return this.connection.promise().query("");
  }
  createEmployee() {
    return this.connection.promise().query("");
  }
  updateRole() {
    return this.connection.promise().query("");
  }
}
module.exports = new DB(connection);
