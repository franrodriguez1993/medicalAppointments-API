import { Request, Response } from "express";
import AppointmentService from "./appointment.services";
import logger from "../../utils/logger";

const service = new AppointmentService();

export default class AppointmentController {
  /**  CREATE  **/
  async create(req: Request, res: Response) {
    try {
      const data = req.body;

      const resService = await service.create(data);

      if (
        resService === "DAY_NOT_FOUND" ||
        resService === "DOCTOR_NOT_FOUND" ||
        resService === "PATIENT_NOT_FOUND" ||
        resService === "STAFF_NOT_FOUND"
      )
        return res.status(404).json({ status: 404, msg: resService });
      else if (
        resService === "APPOINTMENT_ALREADY_EXISTS" ||
        resService === "INVALID ID" ||
        resService === "INVALID_DOCTOR_SCHEDULE" ||
        resService === "MAXIMUM_APPOINTMENTS"
      )
        return res.status(400).json({ status: 400, msg: resService });
      else
        return res.status(201).json({
          status: 201,
          msg: "APPOINTMENT_CREATED",
          data: resService.id,
        });
    } catch (e: unknown) {
      logger.error(e);
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    }
  }

  /**  LIST APPOINTMENT  **/
  async listAppointment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { date } = req.query;

      const resService = await service.listAppointment(id, date.toString());

      if (resService === "INVALID_ID")
        return res.status(400).json({ status: 400, msg: resService });
      else if (resService === "DOCTOR_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: resService });

      return res.status(200).json({ status: 200, msg: "OK", data: resService });
    } catch (e: unknown) {
      logger.error(e);
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    }
  }

  /**   DELETE APPOINTMENT **/
  async deleteOne(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const resService = await service.deleteOne(id);

      if (resService === "INVALID_ID")
        return res.status(400).json({ status: 400, msg: resService });
      else
        return res
          .status(200)
          .json({ status: 200, msg: "APPOINTMENT_DELETED" });
    } catch (e: unknown) {
      logger.error(e);
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    }
  }
}
