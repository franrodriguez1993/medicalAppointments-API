import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwtHandler";
import { StaffPayload } from "../interfaces/staff/payload.interface";
import { staffOIF } from "../interfaces/staff/staff.interface";
import StaffDao from "../modules/staff/staff.dao";
import ResponseEntity from "../utils/ResponseEntity";

const daoStaff = new StaffDao();

export async function requireToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let token: string = req.headers?.authorization;
    if (!token)
      return res
        .status(401)
        .json(new ResponseEntity(401, "TOKEN_REQUIRED", null));

    token = token.split(" ")[1];

    const checkToken = verifyToken(token) as StaffPayload;

    const staff: staffOIF = await daoStaff.findByID(checkToken.uid);

    if (!staff)
      return res
        .status(404)
        .json(new ResponseEntity(404, "STAFF_NOT_FOUND", null));

    next();
  } catch (e: unknown) {
    if (e instanceof Error) {
      switch (e.message) {
        case "invalid signature":
          return res
            .status(403)
            .json(new ResponseEntity(403, "INVALID_SIGNATURE", null));
        case "jwt expired":
          return res
            .status(403)
            .json(new ResponseEntity(403, "JWT_EXPIRED", null));
        case "invalid token":
          return res
            .status(403)
            .json(new ResponseEntity(403, "INVALID_TOKEN", null));
        default:
          res
            .status(500)
            .json(new ResponseEntity(500, "INTERNAL_SERVER_ERROR", null));
      }
    }
  }
}
