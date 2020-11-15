import express, { Application } from "express";
import bodyParser from "body-parser";
import userRouter from "./route/user";
import transactionRouter from "./route/transaction";
import balanceRouter from "./route/balance";

class App {
  public static readonly DEFAULT_PORT: number = 3000;

  public readonly app: Application;
  public readonly port: number;

  public conn;
  protected postStartHook: () => void;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || App.DEFAULT_PORT;
    this.postStartHook = () => {
      console.log(`App listening on localhost:${this.port}`);
    };
  }

  public start(): void {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    this.app.get("/helloWorld", (req, res) => {
      res.status(200).send({ message: "hello, world" });
    });

    this.app.use("/users", userRouter);
    this.app.use("/transactions", transactionRouter);
    this.app.use("/balance", balanceRouter);

    this.conn = this.app.listen(this.port, this.postStartHook);
  }

  public stop(): void {
    this.conn.close();
  }
}

export function getDefaultApp() {
  return new App();
}

export default App;
