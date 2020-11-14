import "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import { Application } from "express";
import App, { getDefaultApp } from "../app";

chai.use(chaiHttp);

const expect = chai.expect;
const server: App = getDefaultApp();
let app: Application;

describe("Split Bill", () => {
  before(async () => {
    server.start();
    app = server.app;
  });

  after(async () => {
    server.stop();
  });

  // beforeEach(async () => {});

  describe("GET helloworld", () => {
    it("should return helloworld ", async () => {
      const res = await chai.request(app).get("/helloworld");
      expect(res.body).to.deep.equal({ message: "hello, world" });
    });
  });

  describe("/users", () => {
    it("should return all users with GET /users", async () => {
      const res = await chai.request(app).get("/users");
      expect(res.body.length).to.not.equal(0);
    });
    it("should return the new user with POST /users", async () => {
      const newUser = { name: "Kishibe" };
      const res = await chai.request(app).post("/users").send(newUser);
      expect(res.body.name).to.deep.equal(newUser.name);
      expect(res).to.have.status(201);
    });
  });
});
