import DatabaseConnectionManager from "../database";
import User from "../entity/User";
import { getRepository } from "typeorm";

class UserManager {
  /**
   * Get all users
   */
  public static async findAllUser(): Promise<User[]> {
    let conn;
    let users = [];
    try {
      conn = await DatabaseConnectionManager.connect();
      const userRepository = getRepository(User);
      users = await userRepository.find();
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await conn.close();
    }
    return users;
  }
  /**
   * Get the user by name
   */
  public static async findUserByName(name: string): Promise<User> {
    let conn;
    let user: User;
    try {
      const userName: Partial<User> = {};
      userName.name = name;
      conn = await DatabaseConnectionManager.connect();
      const userRepository = getRepository(User);
      user = await userRepository.findOne(userName);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await conn.close();
    }
    return user;
  }
  /**
   * Get the users by names
   */
  public static async findUsersByNames(names: string[]): Promise<User[]> {
    let conn;
    const users: User[] = [];
    try {
      conn = await DatabaseConnectionManager.connect();
      const userRepository = getRepository(User);
      for (const name of names) {
        const userName: Partial<User> = {};
        userName.name = name;
        const user = await userRepository.findOne(userName);
        users.push(user);
      }
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await conn.close();
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
      throw err;
    } finally {
      await conn.close();
    }
    return user;
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
