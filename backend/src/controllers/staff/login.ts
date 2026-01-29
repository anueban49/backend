import type { RequestHandler } from "express";
import { staffModel } from "../../database/schema/staff.schema.js";

export const login: RequestHandler = (req, res) => {
    const { username, password } = req.body;
    const staffExists = staffModel.findOne('username')

}