import { connect, Mongoose } from "mongoose";
export const uri = `mongodb+srv://admin:${process.env.API_KEY}@cluster0.s6b3pdk.mongodb.net/?appName=Cluster0`;
export const connectToDB = async () => {
  await connect(uri);
};
