import { User } from "entity/User";
import express from "express";
import UserManager from "../service/user";

const router = express.Router();

// router.get("/", async (req, res) => {
//   const users = await UserManager.findAllUser();
//   res.send(users);
// });
router.post("/", async (req, res) => {
  const newUser = req.body;
  try {
    const user = await UserManager.saveUser(newUser);
    res.status(201).send(user);
  } catch (err) {
    res.status(422).send(err);
  }
});
// router.delete("/:name", async (req, res) => {
//   const name = req.params.name;
//   const user: User = await UserManager.findUserByName(name);
//   if (user === undefined) {
//     res.status(404).end();
//   } else {
//     try {
//       await UserManager.deleteUser(user);
//     } catch (err) {
//       res.status(409).send(err);
//     }
//     res.status(200).end();
//   }
// });

export default router;
