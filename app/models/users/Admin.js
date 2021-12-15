import User from "./User.js";

// A model of how we want our user name and password for our admin account
export default class Admin extends User {
  constructor({ username, password }) {
    super({ username, password });
    this.role = "ADMIN";
  }

  validate() {
    const errors = [];

    if (!this.username) {
      errors.push("Username is required");
    }

    if (!this.password) {
      errors.push("Password is required");
    }

    return errors;
  }
}
