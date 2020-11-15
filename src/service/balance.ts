import DatabaseConnectionManager from "../database";
import { getRepository } from "typeorm";
import TrxPayer from "../entity/TrxPayer";
import TrxPayee from "../entity/TrxPayee";
import UserManager from "./user";

class BalanceManager {
  /**
   * Get all balance
   */
  public static async getAllBalance() {
    let conn;
    let allBalance = [];
    const users = await UserManager.getAllUser();
    try {
      conn = await DatabaseConnectionManager.connect();

      //credit
      const trxPayerRepository = getRepository(TrxPayer);
      const credit = await trxPayerRepository
        .createQueryBuilder()
        .select("SUM(amount) as credit, name")
        .leftJoin("TrxPayer.payer", "users")
        .groupBy("name")
        .getRawMany();

      //debit
      const trxPayeeRepository = getRepository(TrxPayee);
      const trxDebit = await trxPayeeRepository
        .createQueryBuilder()
        .select("amount / COUNT(trxPayer.payerId) as debit, trxPayer.id")
        .leftJoin("TrxPayee.trxPayer", "trxPayer")
        .leftJoin("TrxPayee.payee", "users")
        .groupBy("trxPayer.id, amount")
        .getRawMany();
      const allPayee = await trxPayeeRepository
        .createQueryBuilder()
        .select("trxPayer.id, users.name")
        .leftJoin("TrxPayee.trxPayer", "trxPayer")
        .leftJoin("TrxPayee.payee", "users")
        .getRawMany();

      //balance
      allBalance = users.map((user) => {
        const balance = {
          user: user.name,
          balance: 0,
          debit: 0,
          credit: 0,
        };
        balance.credit = credit
          .filter((c) => c.name === user.name)
          .reduce((acc, cur) => acc + Number(cur.credit), 0);
        balance.debit = allPayee
          .filter((p) => p.name === user.name)
          .map((p) => (p["debit"] = trxDebit.filter((t) => t.id === p.id)[0]))
          .reduce((acc, cur) => acc + Number(cur.debit), 0);
        balance.balance = balance.credit - balance.debit;

        return balance;
      });
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await conn.close();
    }
    return allBalance;
  }
}

export default BalanceManager;
