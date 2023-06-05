import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwtHandler";
import { StaffPayload } from "../interfaces/staff/payload.interface";
import { staffOIF } from "../interfaces/staff/staff.interface";
import StaffDao from "../modules/staff/staff.dao";
import logger from "../utils/logger";

const daoStaff = new StaffDao();

export async function requireToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let token: string = req.headers?.authorization;
    if (!token)
      return res.status(401).json({ status: 401, msg: "TOKEN_REQUIRED" });

    token = token.split(" ")[1];

    const checkToken = verifyToken(token) as StaffPayload;

    const staff: staffOIF = await daoStaff.findByID(checkToken.uid);

    if (!staff)
      return res.status(404).json({ status: 404, msg: "STAFF_NOT_FOUND" });

    next();
  } catch (e: any) {
    if (e.message === "invalid signature")
      return res.json({ status: 403, message: "INVALID_SIGNATURE" });
    else if (e.message === "jwt expired")
      return res.json({ status: 403, message: "JWT_EXPIRED" });
    else if (e.message === "invalid token")
      return res.json({ status: 403, message: "INVALID_TOKEN" });
    else {
      logger.error(e.message);
      return res.json({ status: 500, message: "INTERNAL_SERVER_ERROR" });
    }
  }
}
