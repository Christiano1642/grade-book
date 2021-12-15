import { ObjectId as objectId } from "mongodb";
import client from "../client.js";
import config from "../config.js";

const student = client.db(config.db.name).collection("student");

export default {
  // Controller that can show students all or individualy and update their grades
  index() {
    return student.find().toArray();
  },

  show(id) {
    return student.findOne({ _id: objectId(id) }).toArray();
  },

  async update(id, grade) {
    const studentQuery = {
      _id: objectId(id),
      "grade._id": objectId(grade.id),
    };

    const updateGrade = {
      $set: { "grade_id.$.pointsEarned": grade.pointsEarned },
    };
    return student.updateOne(studentQuery, updateGrade);
  },
};
