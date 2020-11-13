import express, { Application } from "express";
import bodyParser from "body-parser";
import DatabaseConnectionManager from "./database";
import User from "./entity/User";

class App {
  public static readonly DEFAULT_PORT: number = 3000;

  public readonly app: Application;
  public readonly port: number;

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
      DatabaseConnectionManager.connect()
        .then(async (connection) => {
          console.log("Inserting a new user into the database...");
          const user = new User();
          user.firstName = "Timber";
          user.lastName = "Saw";
          user.age = 25;
          await connection.manager.save(user);
          console.log("Saved a new user with id: " + user.id);

          console.log("Loading users from the database...");
          const users = await connection.manager.find(User);
          console.log("Loaded users: ", users);

          console.log(
            "Here you can setup and run express/koa/any other framework."
          );
        })
        .catch((error) => console.log(error));
      res.status(200).send({ message: "hello, world" });
    });

    this.app.listen(this.port, this.postStartHook);
  }
}

export function getDefaultApp() {
  return new App();
}

export default App;
