import client from "../client.js";
import config from "../config.js";

const assignment = client.db(config.db.name).collection("assignment");

export default {
  async create(newAssignment) {
    const result = await assignment.insertOne(newAssignment);
    return result;
  },
};
