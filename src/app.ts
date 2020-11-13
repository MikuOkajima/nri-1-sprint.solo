import express from "express";
import bodyParser = require("body-parser");

class App {
  public app: express.Application;
  constructor() {
    // initializing express in this application
    this.app = express(); // support application/json type post data
    this.app.use(bodyParser.json()); //support application/x-www-form-urlencoded post data
    this.app.get("/helloWorld", (req, res) => {
      res.status(200).send({ message: "hello, world" });
    });
  }
}

export default new App().app;
