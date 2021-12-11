import { Router } from "express";
import studentsController from "../controllers/students.js";

const router = new Router();

router.get("/", (_, res) => {
  res.send("Hello World!");
});

router.post("/students", async (req, res) => {
  if (req.isAuth) {
    const students = await studentsController.index();
    res.send(students);
  }
});

export default router;
