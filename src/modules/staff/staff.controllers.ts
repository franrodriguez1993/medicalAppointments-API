import { Request, Response } from "express";
import StaffService from "./staff.services";
import logger from "../../utils/logger";

const service = new StaffService();

export default class StaffController {
  /**  REGISTER  **/
  async register(req: Request, res: Response) {
    try {
      const data = req.body;

      const resService = await service.register(data);

      if (
        resService === "MAIL_IN_USE" ||
        resService === "USERNAME_IN_USE" ||
        resService === "DNI_IN_USE" ||
        resService === "USER_REGISTERED_WITH_OTHER_MAIL"
      )
        return res.status(400).json({ status: 400, msg: resService });
      else if (
        resService === "ERROR_CREATING_STAFF" ||
        resService === "ERROR_CREATING_USER"
      )
        return res.status(500).json({ status: 500, msg: resService });
      else
        return res
          .status(201)
          .json({ status: 201, msg: "STAFF_REGISTERED", data: resService });
    } catch (e: any) {
      logger.error(e);
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    }
  }

  /**  LOGIN  **/

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const resService = await service.login(username, password);

      if (resService === "INVALID_CREDENTIALS")
        return res.status(400).json({ status: 400, msg: resService });

      return res
        .status(200)
        .json({ status: 200, msg: "LOGIN_SUCCESSFULLY", data: resService });
    } catch (e: any) {
      logger.error(e);
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    }
  }

  /** LIST **/
  async list(req: Request, res: Response) {
    try {
      const page: number = parseInt(req.query.page as string);
      const size: number = parseInt(req.query.page as string);

      const resService = await service.list(page, size);

      return res.status(200).json({ status: 200, msg: "OK", data: resService });
    } catch (e: any) {
      logger.error(e);
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    }
  }

  /**  UPDATE PERSONAL DATA  **/

  async updatePersonalData(req: Request, res: Response) {
    try {
      const data = req.body;
      const { id } = req.params;

      const resService = await service.updatePersonalData(id, data);

      if (resService === "STAFF_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: resService });
      else if (resService === "INVALID_ID")
        return res.status(400).json({ status: 400, msg: resService });

      return res.status(201).json({ status: 201, msg: "STAFF_UPDATED" });
    } catch (e: any) {
      logger.error(e);
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    }
  }

  /** CHANGE MAIL  **/
  async changeMail(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { mail } = req.body;

      const resService = await service.changeMail(id, mail);

      if (
        resService === "INVALID_ID" ||
        resService === "MAIL_IN_USE" ||
        resService === "MAIL_IS_THE_SAME"
      )
        return res.status(400).json({ status: 400, msg: resService });
      else if (resService === "STAFF_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: resService });

      return res.status(201).json({ status: 201, msg: "MAIL_UPDATED" });
    } catch (e: any) {
      logger.error(e);
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    }
  }

  /** CHANGE USERNAME  **/
  async changeUsername(req: Request, res: Response) {
    try {
      const { username } = req.body;
      const { id } = req.params;

      const resService = await service.changeUsername(id, username);

      if (
        resService === "INVALID_ID" ||
        resService === "USERNAME_IS_THE_SAME" ||
        resService === "USERNAME_ALREADY_IN_USE"
      )
        return res.status(400).json({ status: 400, msg: resService });
      else if (resService === "STAFF_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: resService });
      else
        return res.status(201).json({ status: 201, msg: "USERNAME_UPDATED" });
    } catch (e: any) {
      logger.error(e);
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    }
  }

  /** CHANGE PASSWORD  **/
  async changePassword(req: Request, res: Response) {
    try {
      const { password } = req.body;
      const { id } = req.params;

      const resService = await service.changePassword(id, password);

      if (resService === "INVALID_ID" || resService === "PASSWORD_IS_THE_SAME")
        return res.status(400).json({ status: 400, msg: resService });
      else if (resService === "STAFF_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: resService });
      else
        return res.status(201).json({ status: 201, msg: "PASSWORD_UPDATED" });
    } catch (e: any) {
      logger.error(e);
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    }
  }

  /** FIND BY ID  **/
  async findByID(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const resService = await service.findByID(id);

      if (resService === "INVALID_ID")
        return res.status(400).json({ status: 400, msg: resService });
      else if (resService === "STAFF_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: resService });

      return res.status(200).json({ status: 200, msg: "OK", data: resService });
    } catch (e: any) {
      logger.error(e);
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    }
  }

  /** UPDATE SALARY  **/
  async updateSalary(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { salary } = req.body;

      const resService = await service.updateSalary(id, salary);

      if (resService === "INVALID_ID")
        return res.status(400).json({ status: 400, msg: resService });
      else if (resService === "STAFF_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: resService });

      return res.status(201).json({ status: 201, msg: "SALARY_UPDATED" });
    } catch (e: any) {
      logger.error(e);
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    }
  }

  /** UPDATE STATUS  **/
  async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const resService = await service.updateStatus(id, status);

      if (resService === "INVALID_ID" || resService === "INVALID_STATUS")
        return res.status(400).json({ status: 400, msg: resService });
      else if (resService === "STAFF_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: resService });

      return res.status(201).json({ status: 201, msg: "STATUS_UPDATED" });
    } catch (e: any) {
      logger.error(e);
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    }
  }
}
