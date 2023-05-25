import StaffService from "./staff.services";
import { staffBodyIF } from "../../interfaces/staff/staff.interface";
import { Request, Response } from "express";
import logger from "../../utils/logger";

const service = new StaffService();

export default class StaffController {
  /**   REGISTER   **/
  async register(req: Request, res: Response) {
    try {
      const data: staffBodyIF = req.body;

      const resService = await service.register(data);

      if (resService === "MAIL_IN_USE" || resService === "DNI_IN_USE")
        return res.status(400).json({ status: 400, msg: resService });
      else
        return res.status(201).json({ status: 201, msg: "STAFF_REGISTERED" });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /**   LOGIN   **/
  async login(req: Request, res: Response) {
    try {
      const { mail, password } = req.body;

      const resService = await service.login(mail, password);

      if (resService === "USER_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: resService });
      else if (resService === "INVALID_CREDENTIALS")
        return res.status(400).json({ status: 400, msg: resService });
      else {
        return res
          .status(200)
          .json({ status: 200, msg: "LOGIN_SUCCESSFULLY", data: resService });
      }
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }
}
