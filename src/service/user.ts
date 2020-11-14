import DatabaseConnectionManager from "../database";
import User from "../entity/User";
import { getRepository } from "typeorm";

class UserManager {
  /**
   * Get all users
   */
  public static async getAllUser(): Promise<User[]> {
    let conn;
    let users = [];
    try {
      conn = await DatabaseConnectionManager.connect();
      const userRepository = getRepository(User);
      users = await userRepository.find();
    } catch (err) {
      console.log(err);
    } finally {
      conn.close();
    }
    return users;
  }
  /**
   * Save new user
   */
  public static async saveUser(newUser: Partial<User>): Promise<User> {
    let conn;
    let user;
    try {
      conn = await DatabaseConnectionManager.connect();
      const userRepository = getRepository(User);
      await userRepository.save(newUser);
      user = await userRepository.findOne(newUser);
    } catch (err) {
      console.log(err);
    } finally {
      conn.close();
    }
    return user;
  }
  /**
   * Delete user by name
   */
  public static async deleteUser(name: string) {
    let conn;
    try {
      const userName: Partial<User> = {};
      userName.name = name;
      conn = await DatabaseConnectionManager.connect();
      const userRepository = getRepository(User);
      const user: User = await userRepository.findOne(userName);
      await userRepository.remove(user);
    } catch (err) {
      console.log(err);
    } finally {
      conn.close();
    }
    return;
  }
}

export default UserManager;
