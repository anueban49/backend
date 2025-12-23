import express from "express";
import "dotenv/config";

import { connectToDB } from "./database/index.js";
await connectToDB();
const app = express();


const uri = process.env.MONGODB_URI!;
connectToDB(uri).then(() => {
  app.listen(port, () => console.log(...));
});

const port = 4049;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port 4049`);
});


