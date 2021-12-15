import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../client.js";
import config from "../config.js";

const admin = client.db(config.db.name).collection("admin");

// Our admin controller that creates and shows our admin accounts
export default {
  async create({ username, password, role }) {
    const existingUser = await admin.findOne({ username });

    if (existingUser) {
      throw new Error(`User ${username} already exists`);
    }

    const hash = await bcrypt.hash(password, config.encryption.saltRounds);

    return admin.insertOne({ username, password: hash, role });
  },

  async show({ username, password }) {
    const user = await admin.findOne({ username });

    if (!user) {
      throw new Error(`User ${username} not found`);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw Error("Password does not match");
    }

    return jwt.sign({ username, role: user.role }, config.encryption.secret, {
      expiresIn: config.encryption.expiration,
    });
  },
};
