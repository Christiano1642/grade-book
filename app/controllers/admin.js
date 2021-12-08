import bcrypt from "bcrypt";
import client from "../client.js";
import config from "../config.js";

const admin = client.db(config.db.name).collection("admin");

export default {
  async create(username, password) {
    const existingUser = admin.findOne({ username });

    if (existingUser) {
      throw new Error(`User ${username} already exists`);
    }

    const hash = await bcrypt.hash(password, 10);

    return admin.insertOne({ username, password: hash });
  },
};
