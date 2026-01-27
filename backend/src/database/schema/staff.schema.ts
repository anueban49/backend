import { Schema, model } from "mongoose";

const staffSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileImage: { type: String, required: false },
  },
  { timestamps: true },
);
export const staffModel = model("Staff", staffSchema);
