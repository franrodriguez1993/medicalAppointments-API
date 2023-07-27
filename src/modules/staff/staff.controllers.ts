import { Request, Response } from "express";
import StaffService from "./staff.services";
import logger from "../../utils/logger";
import ResponseEntity from "../../utils/ResponseEntity";

const service = new StaffService();

export default class StaffController {
  /**  REGISTER  **/
  async register(req: Request, res: Response) {
    try {
      const data = req.body;

      const resService = await service.register(data);
      return res
        .status(201)
        .json(new ResponseEntity(201, "STAFF_REGISTERED", resService));
    } catch (e: unknown) {
      if (e instanceof Error) {
        switch (e.message) {
          case "DNI_IN_USE":
          case "MAIL_IN_USE":
          case "USERNAME_IN_USE":
          case "USER_REGISTERED_WITH_OTHER_MAIL":
            return res
              .status(400)
              .json(new ResponseEntity(400, e.message, null));
          case "ERROR_CREATING_STAFF":
          case "ERROR_CREATING_USER":
            return res
              .status(500)
              .json(new ResponseEntity(500, e.message, null));
          default:
            return res
              .status(500)
              .json(new ResponseEntity(500, "SERVER_ERROR", null));
        }
      }
    }
  }

  /**  LOGIN  **/

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const resService = await service.login(username, password);

      return res
        .status(200)
        .json(new ResponseEntity(200, "LOGIN_SUCCESSFULLY", resService));
    } catch (e: unknown) {
      if (e instanceof Error) {
        switch (e.message) {
          case "INVALID_CREDENTIALS":
            return res
              .status(400)
              .json(new ResponseEntity(400, e.message, null));
          default:
            return res
              .status(500)
              .json(new ResponseEntity(500, e.message, null));
        }
      }
    }
  }

  /** LIST **/
  async list(req: Request, res: Response) {
    try {
      const page: number = parseInt(req.query.page as string);
      const size: number = parseInt(req.query.page as string);

      const resService = await service.list(page, size);

      return res.status(200).json(new ResponseEntity(200, "OK", resService));
    } catch (e: unknown) {
      return res
        .status(500)
        .json(new ResponseEntity(200, "SERVER_ERROR", null));
    }
  }

  /**  UPDATE PERSONAL DATA  **/

  async updatePersonalData(req: Request, res: Response) {
    try {
      const data = req.body;
      const { id } = req.params;

      await service.updatePersonalData(id, data);

      return res.status(201).json(new ResponseEntity(201, "STAFF_UPDATED", id));
    } catch (e: unknown) {
      if (e instanceof Error) {
        switch (e.message) {
          case "STAFF_NOT_FOUND":
            return res
              .status(404)
              .json(new ResponseEntity(404, e.message, null));
          case "INVALID_ID":
            return res
              .status(400)
              .json(new ResponseEntity(400, e.message, null));
          default:
            return res
              .status(500)
              .json(new ResponseEntity(200, "SERVER_ERROR", null));
        }
      }
    }
  }

  /** CHANGE MAIL  **/
  async changeMail(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { mail } = req.body;

      const resService = await service.changeMail(id, mail);

      return res
        .status(200)
        .json(new ResponseEntity(200, "MAIL_UPDATED", resService));
    } catch (e: unknown) {
      if (e instanceof Error) {
        switch (e.message) {
          case "INVALID_ID":
          case "MAIL_IN_USE":
          case "MAIL_IS_THE_SAME":
            return res
              .status(400)
              .json(new ResponseEntity(400, e.message, null));
          case "STAFF_NOT_FOUND":
            return res
              .status(404)
              .json(new ResponseEntity(404, e.message, null));
          default:
            return res
              .status(500)
              .json(new ResponseEntity(200, "SERVER_ERROR", null));
        }
      }
    }
  }

  /** CHANGE USERNAME  **/
  async changeUsername(req: Request, res: Response) {
    try {
      const { username } = req.body;
      const { id } = req.params;

      const resService = await service.changeUsername(id, username);

      return res
        .status(200)
        .json(new ResponseEntity(200, "USERNAME_UPDATED", resService));
    } catch (e: unknown) {
      if (e instanceof Error) {
        switch (e.message) {
          case "INVALID_ID":
          case "USERNAME_IS_THE_SAME":
          case "USERNAME_ALREADY_IN_USE":
            return res
              .status(400)
              .json(new ResponseEntity(400, e.message, null));
          case "STAFF_NOT_FOUND":
            return res
              .status(404)
              .json(new ResponseEntity(404, e.message, null));
          default:
            return res
              .status(500)
              .json(new ResponseEntity(200, "SERVER_ERROR", null));
        }
      }
    }
  }

  /** CHANGE PASSWORD  **/
  async changePassword(req: Request, res: Response) {
    try {
      const { password } = req.body;
      const { id } = req.params;

      await service.changePassword(id, password);

      return res
        .status(200)
        .json(new ResponseEntity(200, "PASSWORD_UPDATED", null));
    } catch (e: unknown) {
      if (e instanceof Error) {
        switch (e.message) {
          case "INVALID_ID":
            return res
              .status(400)
              .json(new ResponseEntity(400, e.message, null));
          case "STAFF_NOT_FOUND":
            return res
              .status(404)
              .json(new ResponseEntity(404, e.message, null));
          default:
            return res
              .status(500)
              .json(new ResponseEntity(200, "SERVER_ERROR", null));
        }
      }
    }
  }

  /** FIND BY ID  **/
  async findByID(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const resService = await service.findByID(id);

      return res.status(200).json(new ResponseEntity(200, "OK", resService));
    } catch (e: unknown) {
      if (e instanceof Error) {
        switch (e.message) {
          case "INVALID_ID":
            return res
              .status(400)
              .json(new ResponseEntity(400, e.message, null));
          case "STAFF_NOT_FOUND":
            return res
              .status(404)
              .json(new ResponseEntity(404, e.message, null));
          default:
            return res
              .status(500)
              .json(new ResponseEntity(200, "SERVER_ERROR", null));
        }
      }
    }
  }

  /** UPDATE SALARY  **/
  async updateSalary(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { salary } = req.body;

      const resService = await service.updateSalary(id, salary);

      return res
        .status(200)
        .json(new ResponseEntity(200, "SALARY_UPDATED", resService));
    } catch (e: unknown) {
      if (e instanceof Error) {
        switch (e.message) {
          case "INVALID_ID":
            return res
              .status(400)
              .json(new ResponseEntity(400, e.message, null));
          case "STAFF_NOT_FOUND":
            return res
              .status(404)
              .json(new ResponseEntity(404, e.message, null));
          default:
            return res
              .status(500)
              .json(new ResponseEntity(200, "SERVER_ERROR", null));
        }
      }
    }
  }

  /** UPDATE STATUS  **/
  async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const resService = await service.updateStatus(id, status);

      return res
        .status(200)
        .json(new ResponseEntity(200, "STATUS_UPDATED", resService));
    } catch (e: unknown) {
      if (e instanceof Error) {
        switch (e.message) {
          case "INVALID_ID":
          case "INVALID_STATUS":
            return res
              .status(400)
              .json(new ResponseEntity(400, e.message, null));
          case "STAFF_NOT_FOUND":
            return res
              .status(404)
              .json(new ResponseEntity(404, e.message, null));
          default:
            return res
              .status(500)
              .json(new ResponseEntity(200, "SERVER_ERROR", null));
        }
      }
    }
  }
}
