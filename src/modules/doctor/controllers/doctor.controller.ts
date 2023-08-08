import { Request, Response } from "express";
import DoctorService from "../services/doctor.services";
import logger from "../../../utils/logger";
import ResponseEntity from "../../../utils/ResponseEntity";

export default class DoctorController {
  private service: DoctorService;

  constructor() {
    this.service = new DoctorService();
  }

  /**  CREATE  **/
  create = async (req: Request, res: Response) => {
    try {
      const data = req.body;

      const resService = await this.service.create(data);

      return res
        .status(201)
        .json(new ResponseEntity(201, "DOCTOR_REGISTERED", resService));
    } catch (e: any) {
      if (e instanceof Error) {
        switch (e.message) {
          case "USER_REGISTERED_WITH_OTHER_MAIL":
          case "DOCTOR_ALREADY_REGISTERED":
          case "INVALID_ID":
            return res
              .status(400)
              .json(new ResponseEntity(400, e.message, null));
          case "ERROR_CREATING_DOCTOR":
          case "ERROR_CREATING_USER":
            return res
              .status(500)
              .json(new ResponseEntity(500, e.message, null));

          case "SPECIALTY_NOT_FOUND":
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

  /** LIST DOCTORS **/
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

  /**  FIND BY ID  **/
  findByID = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const resService = await this.service.findByID(id);

      return res.status(200).json(new ResponseEntity(200, "OK", resService));
    } catch (e: unknown) {
      if (e instanceof Error) {
        switch (e.message) {
          case "DOCTOR_NOT_FOUND":
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
              .json(new ResponseEntity(500, "SERVER_ERROR", null));
        }
      }
    }
  };

  /**  UPDATE DATA  **/
  updateData = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const resService = await this.service.updateData(id, data);

      return res
        .status(200)
        .json(new ResponseEntity(200, "DOCTOR_UPDATED", resService));
    } catch (e: unknown) {
      if (e instanceof Error) {
        switch (e.message) {
          case "DOCTOR_NOT_FOUND":
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
              .json(new ResponseEntity(500, "SERVER_ERROR", null));
        }
      }
    }
  };

  /**  UPDATE MAIL   **/
  updateMail = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const mail = req.body.mail;

      const resService = await this.service.updateMail(id, mail);

      return res
        .status(200)
        .json(new ResponseEntity(200, "DOCTOR_UPDATED", resService));
    } catch (e: unknown) {
      if (e instanceof Error) {
        switch (e.message) {
          case "DOCTOR_NOT_FOUND":
            return res
              .status(404)
              .json(new ResponseEntity(404, e.message, null));
          case "INVALID_ID":
          case "MAIL_IN_USE":
          case "MAIL_IS_THE_SAME":
            return res
              .status(400)
              .json(new ResponseEntity(400, e.message, null));
          default:
            return res
              .status(500)
              .json(new ResponseEntity(500, "SERVER_ERROR", null));
        }
      }
    }
  };

  /**  UPDATE SPECIALTY   **/
  updateSpecialty = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { id_specialty } = req.body;

      const resService = await this.service.updateSpecialty(id, id_specialty);

      return res
        .status(200)
        .json(new ResponseEntity(200, "DOCTOR_UPDATED", resService));
    } catch (e: unknown) {
      if (e instanceof Error) {
        switch (e.message) {
          case "DOCTOR_NOT_FOUND":
          case "SPECIALTY_NOT_FOUND":
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
              .json(new ResponseEntity(500, "SERVER_ERROR", null));
        }
      }
    }
  };

  /**  ADD SCHEDULE **/
  addSchedule = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const { id } = req.params;

      await this.service.addSchedule({ ...data, id_doctor: id });

      return res
        .status(201)
        .json(new ResponseEntity(201, "SCHEDULE_ADDED", null));
    } catch (e: unknown) {
      if (e instanceof Error) {
        switch (e.message) {
          case "DOCTOR_NOT_FOUND":
          case "DAY_NOT_FOUND":
            return res
              .status(404)
              .json(new ResponseEntity(404, e.message, null));
          case "INVALID_ID":
          case "SCHEDULE_ALREADY_EXISTS":
            return res
              .status(400)
              .json(new ResponseEntity(400, e.message, null));
          default:
            return res
              .status(500)
              .json(new ResponseEntity(500, "SERVER_ERROR", null));
        }
      }
    }
  };

  /**  UPDATE SCHEDULE **/
  updateSchedule = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const { id } = req.params;

      await this.service.updateSchedule({
        ...data,
        id_doctor: id,
      });

      return res
        .status(200)
        .json(new ResponseEntity(200, "SCHEDULE_UPDATED", null));
    } catch (e: unknown) {
      if (e instanceof Error) {
        switch (e.message) {
          case "DOCTOR_NOT_FOUND":
          case "DAY_NOT_FOUND":
          case "SCHEDULE_NOT_FOUND":
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
              .json(new ResponseEntity(500, "SERVER_ERROR", null));
        }
      }
    }
  };

  /**  DELETE SCHEDULE **/
  deleteSchedule = async (req: Request, res: Response) => {
    try {
      const { id, day } = req.params;

      await this.service.deleteSchedule(id, day);

      return res
        .status(201)
        .json(new ResponseEntity(200, "SCHEDULE_DELETED", null));
    } catch (e: unknown) {
      if (e instanceof Error) {
        switch (e.message) {
          case "DOCTOR_NOT_FOUND":
          case "DAY_NOT_FOUND":
          case "SCHEDULE_NOT_FOUND":
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
              .json(new ResponseEntity(500, "SERVER_ERROR", null));
        }
      }
    }
  };
}
