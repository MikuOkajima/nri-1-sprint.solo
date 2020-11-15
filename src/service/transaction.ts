import DatabaseConnectionManager from "../database";
import { getRepository } from "typeorm";
import User from "../entity/User";
import TrxPayer from "../entity/TrxPayer";
import TrxPayee from "../entity/TrxPayee";
import UserManager from "./user";

class TrxManager {
  /**
   * Get all transactions
   */
  public static async getAllTrx(): Promise<TrxPayer[]> {
    let conn;
    let allTrxs: TrxPayer[];
    try {
      conn = await DatabaseConnectionManager.connect();
      const trxPayerRepository = getRepository(TrxPayer);
      const trxPayeeRepository = getRepository(TrxPayee);
      allTrxs = await trxPayerRepository.find({
        relations: ["payer", "trxPayees", "trxPayees.payee"],
      });
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await conn.close();
    }
    return allTrxs;
  }
  /**
   * Get the trx by Id
   */
  public static async getTrxById(id: number): Promise<TrxPayer> {
    let conn;
    let trx;
    try {
      conn = await DatabaseConnectionManager.connect();
      const trxPayerRepository = getRepository(TrxPayer);
      trx = await trxPayerRepository.findOne(
        { id: id },
        {
          relations: ["payer", "trxPayees", "trxPayees.payee"],
        }
      );
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await conn.close();
    }
    return trx;
  }
  /**
   * Get the trxPayee by trxPayer
   */
  public static async getTrxPayeeByTrxPayer(trxPayer): Promise<TrxPayee[]> {
    let conn;
    let trxPayees = [];
    try {
      conn = await DatabaseConnectionManager.connect();
      const trxPayeeRepository = getRepository(TrxPayee);
      trxPayees = await trxPayeeRepository.find({ trxPayer: trxPayer });
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await conn.close();
    }
    return trxPayees;
  }
  /**
   * Save new transactions
   */
  public static async saveTrx(newTrx): Promise<TrxPayer> {
    let conn;
    let generatedTrx: TrxPayer;
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
      generatedTrxPayer.trxPayees = [];
      for (const payee of newTrx.payee) {
        const trxPayee: Partial<TrxPayee> = {
          trxPayer: generatedTrxPayer,
          payee: payee,
        };
        const generatedTrxPayee = await trxPayeeRepository.save(trxPayee);
        generatedTrxPayer.trxPayees.push(generatedTrxPayee);
      }
      generatedTrx = generatedTrxPayer;
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
  public static async deleteTrx(trxPayer: TrxPayer) {
    let conn;
    try {
      conn = await DatabaseConnectionManager.connect();
      const trxPayerRepository = getRepository(TrxPayer);
      await trxPayerRepository.remove(trxPayer);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await conn.close();
    }
    return;
  }
  /**
   * update trxPayer and trxPayee by id and patch
   */
  public static async updateTrx(patch: Partial<TrxPayer>) {
    let conn;
    let updatedTrx: TrxPayer;
    try {
      conn = await DatabaseConnectionManager.connect();
      const trxPayerRepository = getRepository(TrxPayer);
      await trxPayerRepository.save(patch);
      if (patch["payees"] !== undefined) {
        const trxPayeeRepository = getRepository(TrxPayee);
        await trxPayeeRepository.delete({ trxPayer: patch });
        for (const trxPayee of patch["payees"]) {
          await trxPayeeRepository.save(trxPayee);
        }
      }
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await conn.close();
    }
    return;
  }
  /**
   * format trxPayer and trxPayee to remove unnecessary info
   */
  public static format(trxPayer: TrxPayer) {
    let newTrx = {};
    newTrx = trxPayer;
    newTrx["date"] =
      trxPayer.date.toLocaleDateString() +
      " " +
      trxPayer.date.toLocaleTimeString();
    newTrx["payer"] = trxPayer.payer.name;
    newTrx["payees"] = trxPayer.trxPayees.map(
      (trxPayee) => trxPayee.payee.name
    );
    if (newTrx["trxPayees"] !== undefined) delete newTrx["trxPayees"];
    return newTrx;
  }
  /**
   * Create patch to update trxPayer and trxPayee
   */
  public static async createTrxPatch(trxPayer: TrxPayer, updateTrxPayer) {
    const patch: Partial<TrxPayer> = {};
    patch.id = trxPayer.id;
    for (const [key, value] of Object.entries(updateTrxPayer)) {
      if (key === "payer") {
        patch[key] = await UserManager.getUserByName(String(value));
        if (patch[key] === undefined) throw "payer is invalid";
      } else if (key === "payees") {
        if (typeof value !== "object") throw "payees is invalid";
        const trxPayees: Partial<TrxPayee>[] = [];
        for (const i in value) {
          const payee = value[i];
          const payeeUser = await UserManager.getUserByName(payee);
          if (payeeUser === undefined) throw "payees is invalid";
          trxPayees.push({
            trxPayer: trxPayer,
            payee: payeeUser,
          });
        }
        patch[key] = trxPayees;
      } else if (trxPayer[key] === undefined) {
        throw key + " is invalid key";
      } else {
        patch[key] = value;
      }
    }
    return patch;
  }
}

export default TrxManager;
