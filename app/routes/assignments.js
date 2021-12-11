import { Router } from "express";
import assignmentController from "../controllers/assignments.js";

const router = new Router();

router.get("/", (_, res) => {
  res.send("Hello Assignments!");
});

router.post("/class", async (req, res) => {
  if (req.isAuth) {
    const spit = await assignmentController.create(req.body);

    res.status(201).json({ spit });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

export default router;
