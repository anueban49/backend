import express from "express";
import "dotenv/config";
import { connectDB } from "./lib/db";
const uri = process.env.MONGODB_URI!;
connectDB(uri).then(() => {
  app.listen(port, () => console.log(...));
});
const app = express();
const port = 4049;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port 4049`);
});
