import express from "express";
import BalanceManager from "../service/balance";

const router = express.Router();

router.get("/", async (req, res) => {
  const balance = await BalanceManager.getAllBalance();
  res.send(balance);
});

export default router;
