import { Router } from "express";
import adminController from "../controllers/admin.js";
import Admin from "../models/users/Admin.js";

const router = new Router();

router.get("/", (_, res) => {
  res.send("Hello Admin!");
});

router.post("/register", async (req, res) => {
  try {
    const admin = new Admin(req.body);

    const errors = admin.validate();
    if (errors.length) {
      throw new Error(errors.join("\n"));
    }

    await adminController.create(admin);
    const jwt = await adminController.show(admin);

    res.status(201).json(jwt);
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const jwt = await adminController.show(req.body);
    res.status(201).json(jwt);
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

export default router;
