import express from "express";
import "reflect-metadata";
import App, { getDefaultApp } from "./app";

const app = express();

const launch = () => {
  const app: App = getDefaultApp();
  app.start();
};

launch();
