import { connect, Mongoose } from "mongoose"
export const connectToDB= async() => {
    await connect("mongodb+srv://admin:<db_password>@cluster0.s6b3pdk.mongodb.net/?appName=Cluster0");
}