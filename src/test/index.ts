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
    it("should delete new user with DELETE /users:name", async () => {
      const res = await chai.request(app).delete("/users/Kishibe");
      const res2 = await chai.request(app).get("/users");
      const deletedUser = res2.body.filter((e) => e.name === "Kishibe");
      expect(deletedUser.length).to.equal(0);
      expect(res).to.have.status(200);
    });
  });

  describe("/transactions", () => {
    let newTrxId;
    it("should enter new transaction with POST /transactions", async () => {
      const newTrx = {
        payer: "Makima",
        amount: 3500,
        purpose: "test",
        payees: ["Denji", "Aki", "Makima"],
      };
      const res = await chai.request(app).post("/transactions").send(newTrx);
      newTrxId = res.body.id;
      expect(res).to.have.status(201);
    });
    it("should return all transactions with GET /transactions", async () => {
      const res = await chai.request(app).get("/transactions");
      expect(res.body).to.not.be.empty;
      expect(res.body.length).to.not.equal(0);
      expect(res.body[0].id).to.not.undefined;
    });
    it("should return the transaction with GET /transactions/:id", async () => {
      const res = await chai.request(app).get("/transactions/" + newTrxId);
      const expected = {
        id: Number(newTrxId),
        payer: "Makima",
        amount: 3500,
        purpose: "test",
        payees: ["Denji", "Aki", "Makima"],
      };
      const actual = res.body;
      delete actual.date;
      expect(actual).to.deep.equal(expected);
    });
    it("should update the transaction with PATCH /transactions", async () => {
      const update = {
        payer: "Denji",
        amount: 2200,
        purpose: "test update",
        payees: ["Power", "Aki", "Makima"],
      };
      const expected = {
        id: Number(newTrxId),
        payer: "Denji",
        amount: 2200,
        purpose: "test update",
        payees: ["Power", "Aki", "Makima"],
      };
      const res = await chai
        .request(app)
        .patch("/transactions/" + String(newTrxId))
        .send(update);
      const actual = res.body;
      delete actual.date;
      expect(actual).to.deep.equal(expected);
      expect(res).to.have.status(200);
    });
    it("should return 404 when id is invalid with PATCH /transactions", async () => {
      const res = await chai.request(app).patch("/transactions/" + -1);
      expect(res).to.have.status(404);
    });
    it("should return 409 with error message when payer is invalid with PATCH /transactions", async () => {
      const update = {
        payer: "INVALID",
      };
      const expected = { error: "payer is invalid" };
      const res = await chai
        .request(app)
        .patch("/transactions/" + String(newTrxId))
        .send(update);
      expect(res.body).to.deep.equal(expected);
      expect(res).to.have.status(409);
    });
    it("should return 409 with error message when payee is invalid with PATCH /transactions", async () => {
      const update = {
        payees: "INVALID",
      };
      const expected = { error: "payees is invalid" };
      const res = await chai
        .request(app)
        .patch("/transactions/" + String(newTrxId))
        .send(update);
      expect(res.body).to.deep.equal(expected);
      expect(res).to.have.status(409);
    });
    it("should delete the transaction with DELETE /transactions", async () => {
      const res = await chai
        .request(app)
        .delete("/transactions/" + String(newTrxId));
      expect(res).to.have.status(200);
    });
    it("should return 404 when id is invalid with DELETE /transactions", async () => {
      const res = await chai.request(app).delete("/transactions/" + -1);
      expect(res).to.have.status(404);
    });
  });
});
