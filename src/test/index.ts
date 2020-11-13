import "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import { Application } from "express";
import App, { getDefaultApp } from "../app";

chai.use(chaiHttp);

const expect = chai.expect;

describe("expense manager", () => {
  let app: Application;
  before(async () => {
    const server: App = getDefaultApp();
    server.start();
    app = server.app;
  });

  // after(async () => {});

  // beforeEach(async () => {});

  describe("GET helloworld", () => {
    it("should return helloworld ", async () => {
      const res = await chai.request(app).get("/helloworld");
      expect(res.body).to.deep.equal({ message: "hello, world" });
    });
  });
});
