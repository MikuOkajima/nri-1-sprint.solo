import express from "express";
import UserManager from "../service/user";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await UserManager.getAllUser();
  res.send(users);
});
router.post("/", async (req, res) => {
  const newUser = req.body;
  const user = await UserManager.saveUser(newUser);
  res.status(201).send(user);
});

export default router;
