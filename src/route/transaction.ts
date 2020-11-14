import { User } from "entity/User";
import express from "express";
import UserManager from "../service/user";
import TrxManager from "../service/transaction";
import TrxPayer from "entity/TrxPayer";

const router = express.Router();

router.get("/", async (req, res) => {
  const trxs = await TrxManager.findAllTrx();
  res.send(trxs);
});

router.post("/", async (req, res) => {
  const newTrx = req.body;
  try {
    const payerName = newTrx.payer;
    const payerUser: User = await UserManager.findUserByName(payerName);
    const payeeNames = newTrx.payee;
    const payeeUsers: User[] = await UserManager.findUsersByNames(payeeNames);
    newTrx.payer = payerUser;
    newTrx.payee = payeeUsers;
    const trx = await TrxManager.saveTrx(newTrx);
    res.status(201).send(trx);
  } catch (err) {
    res.status(422).send(err);
  }
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const trxPayer: TrxPayer = await TrxManager.findTrxById(id);
  if (trxPayer === undefined) {
    res.status(404).end();
  } else {
    try {
      await TrxManager.deleteTrx(trxPayer);
    } catch (err) {
      res.status(409).send(err);
    }
    res.status(200).end();
  }
});

export default router;
