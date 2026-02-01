import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const StaffAuthMiddleware: RequestHandler = (req, res, next) => {
    const authorization = req.headers.authorization;
    const token = authorization?.split(" ")[1] as string;
};
