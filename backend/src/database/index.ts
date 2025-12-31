import { connect, Mongoose } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const uri = `mongodb+srv://admin:${process.env.MONGODB_API_KEY}@cluster0.s6b3pdk.mongodb.net/?appName=Cluster0`;
export const connectToDB = async () => {
  await connect(uri);
};

//CRUD method -> Create, Read, Update, Delete
//three branch of database needed: food, staff info, customer info.