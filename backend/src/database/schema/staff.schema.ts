import { Schema, model } from "mongoose";

const StaffSchema = new Schema(
  {
    StaffID: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileImage: { type: String, required: false },
    SSN: {type: String, required: true},
  },
  { timestamps: true },
);
export const StaffModel = model("Staff", StaffSchema);
