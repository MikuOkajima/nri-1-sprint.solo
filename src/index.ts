import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import DatabaseConnectionManager from "./database";
import bodyParser from "body-parser";
const app = express();

//body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000; // port番号を指定

app.get("/helloWorld", (req, res) => {
  DatabaseConnectionManager.connect()
    .then(async (connection) => {
      // () => {
      //     const app: App = getDefaultApp(APP_SECRET);
      //     app.start();
      //   });

      // createConnection().then(async connection => {

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

//サーバ起動
app.listen(port);
console.log("listen on port " + port);

// import app from './app';const PORT = 3000;app.listen(PORT, () => {
//     console.info('Express server listening on http://localhost:3000');
//   });
