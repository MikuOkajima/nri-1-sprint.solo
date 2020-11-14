import DatabaseConnectionManager from "../database";
import User from "../entity/User";

class UserManager {
  /**
   * Get user by primary key
   */
  public static async getAllUser(): Promise<User[]> {
    let conn;
    let users = [];
    try {
      conn = await DatabaseConnectionManager.connect();
      users = await conn.manager.find(User);
    } catch (err) {
      console.log(err);
    } finally {
      conn.close();
    }
    return users;
  }
}

export default UserManager;
