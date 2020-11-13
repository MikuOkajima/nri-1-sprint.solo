import express from "express";
import "reflect-metadata";
// import { User } from "./entity/User";
// import DatabaseConnectionManager from "./database";
// import bodyParser from "body-parser";
import App, { getDefaultApp } from './app';

const app = express();

//body-parserの設定
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// const port = process.env.PORT || 3000; // port番号を指定


//サーバ起動
// app.listen(port);
// console.log("listen on port " + port);


const launch = () => {
  const app: App = getDefaultApp();
  app.start();
};

launch();