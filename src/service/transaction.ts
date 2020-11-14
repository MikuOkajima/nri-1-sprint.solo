import DatabaseConnectionManager from "../database";
import { getRepository } from "typeorm";
import User from "../entity/User";
import TrxPayer from "../entity/TrxPayer";
import TrxPayee from "../entity/TrxPayee";

class UserManager {
  /**
   * Get all transactions
   */
  public static async findAllTrx() {
    let conn;
    let allTrxs = {};
    try {
      conn = await DatabaseConnectionManager.connect();
      const trxPayerRepository = getRepository(TrxPayer);
      const trxPayeeRepository = getRepository(TrxPayee);
      const transactions = await trxPayerRepository.find({
        relations: ["payer", "trxPayees", "trxPayees.payee"],
      });
      allTrxs = transactions.map((trx) => {
        let newTrx = {};
        newTrx = trx;
        newTrx["date"] =
          trx.date.toLocaleDateString() + " " + trx.date.toLocaleTimeString();
        newTrx["payer"] = trx.payer.name;
        newTrx["payees"] = trx.trxPayees.map((trxPayee) => trxPayee.payee.name);
        delete newTrx["trxPayees"];
        return newTrx;
      });
      console.log(allTrxs);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await conn.close();
    }
    return allTrxs;
  }
  /**
   * Save new transactions
   */
  public static async saveTrx(newTrx) {
    let conn;
    let generatedTrx = {};
    try {
      conn = await DatabaseConnectionManager.connect();
      const trxPayerRepository = getRepository(TrxPayer);
      const trxPayeeRepository = getRepository(TrxPayee);
      const trxPayer: Partial<TrxPayer> = {
        payer: newTrx.payer,
        amount: newTrx.amount,
        purpose: newTrx.purpose,
      };
      const generatedTrxPayer = await trxPayerRepository.save(trxPayer);
      for (const payee of newTrx.payee) {
        const trxPayee: Partial<TrxPayee> = {
          trxPayer: generatedTrxPayer,
          payee: payee,
        };
        await trxPayeeRepository.save(trxPayee);
      }
      generatedTrx = generatedTrxPayer;
      generatedTrx["payee"] = newTrx.payee;
      generatedTrx["date"] =
        generatedTrxPayer.date.toLocaleDateString() +
        " " +
        generatedTrxPayer.date.toLocaleTimeString();
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await conn.close();
    }
    return generatedTrx;
  }
  /**
   * Delete user by name
   */
  public static async deleteUser(user: User) {
    let conn;
    try {
      conn = await DatabaseConnectionManager.connect();
      const userRepository = getRepository(User);
      await userRepository.remove(user);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await conn.close();
    }
    return;
  }
}

export default UserManager;
