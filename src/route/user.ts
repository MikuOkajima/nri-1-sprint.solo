import express from "express";
import UserManager from "../service/user";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await UserManager.getAllUser();
  res.send(users);
});

export default router;
