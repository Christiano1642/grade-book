import { Router } from "express";
import studentsController from "../controllers/students.js";

const router = new Router();

router.get("/", (_, res) => {
  res.send("Hello World!");
});

router.post("/alumni", async ({ isAuth }, res) => {
  if (isAuth.role === "ADMIN") {
    try {
      const students = await studentsController.index();
      res.json(students);
    } catch ({ message }) {
      res.status(500).send({ message });
    }
  } else {
    res.status(401).send({ message: "Access Denied" });
  }
});

router.post("/:id", async ({ isAuth, params }, res) => {
  if (isAuth === "ADMIN") {
    try {
      const student = await studentsController.show(params.id);
      res.json(student);
    } catch ({ message }) {
      res.status(500).json({ message });
    }
  } else {
    res.status(401).json({ message: "Acces Denied" });
  }
});

router.put("/grade/:id", async ({ isAuth, body, params }, res) => {
  if (isAuth.role === "ADMIN") {
    try {
      const update = await studentsController.update(params.id, body);
      res.json(update);
    } catch ({ message }) {
      res.status(500).send({ message });
    }
  }
});
export default router;
