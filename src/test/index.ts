import "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import express, { Application } from "express";
import { getRepository, Repository, Not, IsNull } from "typeorm";
// import { v4 as uuid4 } from "uuid";
import DatabaseConnectionManager from "../database";
import App, { getDefaultApp } from '../app';
// import User from "../entities/UserModel";
// import Transaction from "../entities/TransactionModel";
// import Account from "../entities/AccountModel";
// import TransactionManager from "../services/transactions/manager";

chai.use(chaiHttp);

const expect = chai.expect;

describe("expense manager", () => {
  // const APP_SECRET = "xxxyyyxxxyyy";
  // const TEST_USER_ID = "3461cac2-35bd-4d45-a163-f220beb43d76";
  // const TEST_ACCOUNT_ID = "655f6179-543f-45e7-a4ae-69bd9f179c52";

  let app: Application;
  // let userRepo: Repository<User>;
  // let accountRepo: Repository<Account>;
  // let transactionRepo: Repository<Transaction>;

  /**
   * Sign in with test user and obtain a JWT token
   * username: tester
   * password: tester
   */
  async function signInAndGetToken(): Promise<string> {
    const signInResponse = await chai.request(app).post("/token").send({ username: "tester", password: "tester" });

    return signInResponse.body.accessToken;
  }

  before(async () => {
    // await DatabaseConnectionManager.connect();
    // app = getDefaultApp().app;
    const server: App = getDefaultApp();
    server.start();
    app = server.app;

    // userRepo = getRepository(User);
  });

  after(async () => {
    // await userRepo.delete({ id: Not(IsNull()) });
  });

  beforeEach(async () => {
    /**
     * Restore our test user
     * username: tester
     * password: tester
     */
    // let testUser = new User();
    // testUser.id = TEST_USER_ID;
    // testUser.username = "tester";
    // testUser.passwordHash = "$2b$10$g4T0eDtJUoYWkyhNnA9X5OF667.l23GNc9hHro5OCkAFQPJRktf5u";
    // testUser = await userRepo.save(testUser);

    /**
     * Advanced Requirements:
     * - Create and use a dedicated test database
     */
  });

  describe("GET helloworld", () => {
    it("should return helloworld ", async () => {
      const res = await chai.request(app).get('/helloworld');
      expect(res.body).to.deep.equal({ message: "hello, world" });
    });
  });
});
