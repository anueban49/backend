import { Schema, model } from "mongoose";

const staffSchema = new Schema(
    
  {
    role: { enum: ["admin", "staff"], type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);
export const staffModel = model("Staff", staffSchema);
