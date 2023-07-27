import { Request, Response } from "express";
import AppointmentService from "./appointment.services";
import logger from "../../utils/logger";
import ResponseEntity from "../../utils/ResponseEntity";

const service = new AppointmentService();

export default class AppointmentController {
  /**  CREATE  **/
  async create(req: Request, res: Response) {
    try {
      const data = req.body;

      const resService = await service.create(data);

      return res
        .status(201)
        .json(new ResponseEntity(201, "APPOINTMENT_CREATED", resService.id));
    } catch (e: unknown) {
      if (e instanceof Error) {
        switch (e.message) {
          case "DAY_NOT_FOUND":
          case "DOCTOR_NOT_FOUND":
          case "PATIENT_NOT_FOUND":
          case "STAFF_NOT_FOUND":
            return res
              .status(404)
              .json(new ResponseEntity(404, e.message, null));
          case "APPOINTMENT_ALREADY_EXISTS":
          case "INVALID ID":
          case "INVALID_DOCTOR_SCHEDULE":
          case "MAXIMUM_APPOINTMENTS":
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
  }

  /**  LIST APPOINTMENT  **/
  async listAppointment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { date } = req.query;

      const resService = await service.listAppointment(id, date.toString());

      return res.status(200).json(new ResponseEntity(200, "OK", resService));
    } catch (e: unknown) {
      if (e instanceof Error) {
        switch (e.message) {
          case "INVALID_ID":
            return res
              .status(400)
              .json(new ResponseEntity(400, e.message, null));
          case "DOCTOR_NOT_FOUND":
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
  }

  /**   DELETE APPOINTMENT **/
  async deleteOne(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await service.deleteOne(id);
      return res
        .status(200)
        .json(new ResponseEntity(200, "APPOINTMENT_DELETED", null));
    } catch (e: unknown) {
      if (e instanceof Error) {
        switch (e.message) {
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
  }
}
