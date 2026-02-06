import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { 
      //when declaring object inside an object, it's best to declare it as type.
      type: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        street: { type: String, required: true },
        door: { type: String, required: true },
        zipcode: { type: String, required: false },
        additional: { type: String, required: false },
      },
      required: false,
    },
    profileImage: { type: String, required: false },
  },
  { timestamps: true },
);
export const UserModel = model("User", userSchema);
