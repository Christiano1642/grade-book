import { Router } from "express";
import adminController from "../controllers/admin.js";

const router = new Router();

router.get("/", (_, res) => {
  res.send("Hello World!");
});

router.post("/register", (req, res) => {
  try {
  const { username, password } = req;
  const newUser = await adminController.create(username, password);
  res.json(newUser);
  console.log(req.body.controllers(username, password));}
  catch(err) res.status(400).json({message: err.message});)}

export default router;
