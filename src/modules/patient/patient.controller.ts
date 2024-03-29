import { Request, Response } from "express";
import PatientService from "./patient.services";
import ResponseEntity from "../../utils/ResponseEntity";
import logger from "../../utils/logger";

export default class PatientController {
  private service: PatientService;

  constructor() {
    this.service = new PatientService();
  }

  /**  CREATE  **/
  create = async (req: Request, res: Response) => {
    try {
      const data = req.body;

      const resService = await this.service.create(data);

      return res
        .status(201)
        .json({ status: 201, msg: "PATIENT_CREATED", data: resService });
    } catch (e: unknown) {
      if (e instanceof Error) {
        logger.error(e.message);
        switch (e.message) {
          case "PATIENT_ALREADY_EXISTS":
          case "USER_REGISTERED_WITH_ANOTHER_MAIL":
          case "MAIL_IN_USE":
          case "SOCIAL_NUMBER_IN_USE":
            return res
              .status(400)
              .json(new ResponseEntity(400, e.message, null));
          case "ERROR_CREATING_USER":
          case "ERROR_CREATING_PATIENT":
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
  };

  /**  LIST PATIENTS  **/
  list = async (req: Request, res: Response) => {
    try {
      const page: number = parseInt(req.query.page as string);
      const size: number = parseInt(req.query.page as string);

      const resService = await this.service.list(page, size);

      return res.status(200).json(new ResponseEntity(200, "OK", resService));
    } catch (e: unknown) {
      return res
        .status(500)
        .json(new ResponseEntity(500, "SERVER_ERROR", null));
    }
  };

  /**  FIND BY DNI**/
  findByDNI = async (req: Request, res: Response) => {
    try {
      const { dni } = req.params;

      const resService = await this.service.findByDNI(dni);
      return res.status(200).json(new ResponseEntity(200, "OK", resService));
    } catch (e: unknown) {
      if (e instanceof Error) {
        switch (e.message) {
          case "INVALID_DNI":
          case "USER_IS_NOT_PATIENT":
            return res
              .status(400)
              .json(new ResponseEntity(400, e.message, null));
          case "PATIENT_NOT_FOUND":
            return res
              .status(404)
              .json(new ResponseEntity(404, e.message, null));

          default:
            return res
              .status(500)
              .json(new ResponseEntity(500, "SERVER_ERROR", null));
        }
      }
    }
  };

  /**  UPDATE PERSONAL DATA  **/

  updatePD = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const resService = await this.service.updatePD(id, data);

      return res
        .status(200)
        .json(new ResponseEntity(200, "PATIENT_UPDATED", resService));
    } catch (e: unknown) {
      if (e instanceof Error) {
        switch (e.message) {
          case "INVALID_ID":
            return res
              .status(400)
              .json(new ResponseEntity(400, e.message, null));
          case "PATIENT_NOT_FOUND":
            return res
              .status(404)
              .json(new ResponseEntity(404, e.message, null));
          default:
            return res
              .status(500)
              .json(new ResponseEntity(500, "SERVER_ERROR", null));
        }
      }
    }
  };

  /**  UPDATE SOCIAL NUMBER  **/
  updateSN = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { social_number } = req.body;

      const resService = await this.service.updateSN(id, social_number);

      return res
        .status(200)
        .json(new ResponseEntity(200, "PATIENT_UPDATED", resService));
    } catch (e: unknown) {
      if (e instanceof Error) {
        switch (e.message) {
          case "INVALID_ID":
            return res
              .status(400)
              .json(new ResponseEntity(400, e.message, null));
          case "PATIENT_NOT_FOUND":
            return res
              .status(404)
              .json(new ResponseEntity(404, e.message, null));
          default:
            return res
              .status(500)
              .json(new ResponseEntity(500, "SERVER_ERROR", null));
        }
      }
    }
  };

  /**  CHANGE MAIL  **/
  changeMail = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { mail } = req.body;

      const resService = await this.service.changeMail(id, mail);

      return res
        .status(200)
        .json(new ResponseEntity(200, "PATIENT_UPDATED", resService));
    } catch (e: unknown) {
      if (e instanceof Error) {
        switch (e.message) {
          case "INVALID_ID":
          case "MAIL_IN_USE":
          case "MAIL_IS_THE_SAME":
            return res
              .status(400)
              .json(new ResponseEntity(400, e.message, null));
          case "PATIENT_NOT_FOUND":
            return res
              .status(404)
              .json(new ResponseEntity(404, e.message, null));
          default:
            return res
              .status(500)
              .json(new ResponseEntity(500, "SERVER_ERROR", null));
        }
      }
    }
  };
}
