import type { RequestHandler } from "express";
import { UserModel } from "../../database/schema/user.schema.js";

export const getUsers: RequestHandler = async (_req, res) => {
  const Users = await UserModel.find({});
  res.status(200).json(Users);
};
