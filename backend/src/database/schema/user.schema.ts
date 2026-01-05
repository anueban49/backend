import { Schema, model } from "mongoose";
import { unique } from "next/dist/build/utils.js";

const userSchema = new Schema(
  {
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true,},
    email: {type: String, required: true, unique: true},
    addres: {type: String, required: false}
  },
  { timestamps: true }
);
export const UserModel = model("User", userSchema);
