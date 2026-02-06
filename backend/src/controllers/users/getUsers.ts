import type { RequestHandler } from "express";
import { UserModel } from "../../database/schema/user.schema.js";

export const getUsers: RequestHandler = async (_req, res) => {
  const Users = await UserModel.find({});
  res.status(200).json(Users);
}; 
//for getting all users.



export const getUserData: RequestHandler = async (req, res) => {
  //this function is to be operated when the user id does exist.
  const userId = req.body.userId; // getting the userid

  try {
    const user = await UserModel.findById(userId).populate("address");
    if (!user) {
      return res
        .status(401)
        .json({ message: "couldn't find the user [backend]" });
    }
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error, success: false });
  }
};
//for getting one single user.
