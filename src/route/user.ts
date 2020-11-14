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
router.delete("/:name", async (req, res) => {
  const name = req.params.name;
  await UserManager.deleteUser(name);
  res.status(200).end();
});

export default router;
