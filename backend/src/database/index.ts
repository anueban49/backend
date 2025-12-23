import { connect, Mongoose } from "mongoose"
export const connectToDB= async() => {
    await connect("mongodb+srv://admin:Cdm9ne7s1MQcNl7D@cluster0.s6b3pdk.mongodb.net/?appName=Cluster0");
};