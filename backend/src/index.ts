import express from "express";
import { config } from "dotenv";
import { connectToDB } from "./database/index.js";
import { ProductRouter } from "./routers/product.router.js";
import { CategoryRouter } from "./routers/category.router.js";
import { UserRouter } from "./routers/user.router.js";
import { StaffsRouter } from "./routers/staff.router.js";
import { OrderRouter } from "./routers/order.router.js";
import cors from "cors";

config();

const app = express();
app.use(async (req, res, next) => {
  try {
    await connectToDB();
    next();
  } catch (error) {
    res.status(500).json({ message: "DB connection failed" });
  }
});
app.use(
  cors({
    origin: "https://backend-sf44.vercel.app/",
    credentials: true,
  }),
);

app.use(express.json());
const port = 4049
app.listen(port, () => {
  "Example app listeign on port 4049"
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/product", ProductRouter);
app.use("/category", CategoryRouter);
app.use("/user", UserRouter);
app.use("/staff", StaffsRouter);
app.use("/order", OrderRouter);

export default app;


