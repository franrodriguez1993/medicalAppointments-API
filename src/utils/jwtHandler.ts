import { sign, verify } from "jsonwebtoken";
import { StaffPayload } from "../interfaces/staff/payload.interface";
import configServer from "../config/configServer";

const JWT_SECRET = configServer.server.jwt_secret;
const JWT_EXPIRATION = configServer.server.jwt_expiration;

//Generate token:
export const generateToken = (uid: string) => {
  return sign({ uid }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

//Validate token:
export const verifyToken = (jwt: string) => {
  return verify(jwt, JWT_SECRET) as StaffPayload;
};
