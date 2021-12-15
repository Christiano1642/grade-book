import client from "../client.js";
import config from "../config.js";

const assignment = client.db(config.db.name).collection("assignment");
const student = client.db(config.db.name).collection("student");

export default {
  async create(newAssignment) {
    const { insertedID } = await assignment.insertOne(newAssignment);
    await student.updateOne({}, { $push: { grades: newAssignment } });
    return insertedID;
  },
};
