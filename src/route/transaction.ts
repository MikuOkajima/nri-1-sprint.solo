import { User } from "entity/User";
import express from "express";
import UserManager from "../service/user";
import TrxManager from "../service/transaction";
import TrxPayer from "entity/TrxPayer";

const router = express.Router();

router.get("/", async (req, res) => {
  const trxs: TrxPayer[] = await TrxManager.getAllTrx();
  const formattedTrxs = trxs.map((trx) => TrxManager.format(trx));
  res.send(trxs);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const trx = await TrxManager.getTrxById(Number(id));
  if (trx === undefined) {
    res.status(404).end();
  } else {
    const formattedTrx = TrxManager.format(trx);
    res.send(formattedTrx);
  }
});

router.post("/", async (req, res) => {
  const newTrx = req.body;
  try {
    const payerName = newTrx.payer;
    const payerUser: User = await UserManager.getUserByName(payerName);
    const payeeNames = newTrx.payees;
    const payeeUsers: User[] = await UserManager.getUsersByNames(payeeNames);
    newTrx.payer = payerUser;
    newTrx.payee = payeeUsers;
    const trx = await TrxManager.saveTrx(newTrx);
    const formattedTrx = TrxManager.format(trx);
    res.status(201).send(formattedTrx);
  } catch (err) {
    res.status(422).send({ error: err });
  }
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const trxPayer: TrxPayer = await TrxManager.getTrxById(Number(id));
  if (trxPayer === undefined) {
    res.status(404).end();
  } else {
    try {
      await TrxManager.deleteTrx(trxPayer);
    } catch (err) {
      res.status(409).send({ error: err });
    }
    res.status(200).end();
  }
});
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updateTrxPayer = req.body;
  const trxPayer: TrxPayer = await TrxManager.getTrxById(Number(id));
  const updatedTrxPayer = {};
  if (trxPayer === undefined) {
    res.status(404).end();
  } else {
    try {
      const patch: Partial<TrxPayer> = await TrxManager.createTrxPatch(
        trxPayer,
        updateTrxPayer
      );
      await TrxManager.updateTrx(patch);
      const updatedTrxPayer = await TrxManager.getTrxById(Number(id));
      const formattedTrxPayer = TrxManager.format(updatedTrxPayer);
      res.send(formattedTrxPayer);
    } catch (err) {
      res.status(409).send({ error: err });
    }
  }
});

export default router;
