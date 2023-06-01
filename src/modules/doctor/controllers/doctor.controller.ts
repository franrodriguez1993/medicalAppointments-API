import { Request, Response } from "express";
import DoctorService from "../services/doctor.services";
import logger from "../../../utils/logger";

const service = new DoctorService();

export default class DoctorController {
  /**  CREATE  **/
  async create(req: Request, res: Response) {
    try {
      const data = req.body;

      const resService = await service.create(data);
      if (
        resService === "USER_REGISTERED_WITH_OTHER_MAIL" ||
        resService === "DOCTOR_ALREADY_REGISTERED" ||
        resService === "INVALID_ID"
      )
        return res.status(400).json({ status: 400, msg: resService });
      else if (
        resService === "ERROR_CREATING_DOCTOR" ||
        resService === "ERROR_CREATING_USER"
      )
        return res.status(500).json({ status: 500, msg: resService });
      else if (resService === "SPECIALTY_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: resService });
      else
        return res
          .status(201)
          .json({ status: 201, msg: "DOCTOR_REGISTERED", data: resService });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    }
  }

  /**  FIND BY ID  **/
  async findByID(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const resService = await service.findByID(id);

      if (resService === "DOCTOR_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: resService });
      else if (resService === "INVALID_ID")
        return res.status(400).json({ status: 400, msg: resService });
      else
        return res
          .status(200)
          .json({ status: 200, msg: "OK", data: resService });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    }
  }

  /**  UPDATE DATA  **/
  async updateData(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;

      const resService = await service.updateData(id, data);

      if (resService === "DOCTOR_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: resService });
      else if (resService === "INVALID_ID")
        return res.status(400).json({ status: 400, msg: resService });

      return res.status(201).json({ status: 201, msg: "DOCTOR_UPDATED" });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    }
  }

  /**  UPDATE MAIL   **/
  async updateMail(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const mail = req.body.mail;

      const resService = await service.updateMail(id, mail);

      if (resService === "DOCTOR_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: resService });
      else if (
        resService === "INVALID_ID" ||
        resService === "MAIL_IN_USE" ||
        resService === "MAIL_IS_THE_SAME"
      )
        return res.status(400).json({ status: 400, msg: resService });

      return res.status(201).json({ status: 201, msg: "DOCTOR_UPDATED" });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    }
  }

  /**  UPDATE SPECIALTY   **/
  async updateSpecialty(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { id_specialty } = req.body;

      const resService = await service.updateSpecialty(id, id_specialty);

      if (resService === "INVALID_ID")
        return res.status(400).json({ status: 400, msg: resService });
      else if (
        resService === "DOCTOR_NOT_FOUND" ||
        resService === "SPECIALTY_NOT_FOUND"
      )
        return res.status(404).json({ status: 404, msg: resService });
      else return res.status(201).json({ status: 201, msg: "DOCTOR_UPDATED" });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    }
  }

  /**  ADD SCHEDULE **/
  async addSchedule(req: Request, res: Response) {
    try {
      const data = req.body;
      const { id } = req.params;

      const resService = await service.addSchedule({ ...data, id_doctor: id });

      if (
        resService === "INVALID_ID" ||
        resService === "SCHEDULE_ALREADY_EXISTS"
      )
        return res.status(400).json({ status: 400, msg: resService });
      else if (
        resService === "DAY_NOT_FOUND" ||
        resService === "DOCTOR_NOT_FOUND"
      )
        return res.status(404).json({ status: 404, msg: resService });
      else return res.status(201).json({ status: 201, msg: "SCHEDULE_ADDED" });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    }
  }

  /**  UPDATE SCHEDULE **/
  async updateSchedule(req: Request, res: Response) {
    try {
      const data = req.body;
      const { id } = req.params;

      const resService = await service.updateSchedule({
        ...data,
        id_doctor: id,
      });

      if (resService === "INVALID_ID")
        return res.status(400).json({ status: 400, msg: resService });
      else if (
        resService === "DAY_NOT_FOUND" ||
        resService === "DOCTOR_NOT_FOUND" ||
        resService === "SCHEDULE_NOT_FOUND"
      )
        return res.status(404).json({ status: 404, msg: resService });
      else
        return res.status(201).json({ status: 201, msg: "SCHEDULE_UPDATED" });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    }
  }

  /**  DELETE SCHEDULE **/
  async deleteSchedule(req: Request, res: Response) {
    try {
      const { id, day } = req.params;

      const resService = await service.deleteSchedule(id, day);

      if (resService === "INVALID_ID")
        return res.status(400).json({ status: 400, msg: resService });
      else if (
        resService === "DAY_NOT_FOUND" ||
        resService === "DOCTOR_NOT_FOUND" ||
        resService === "SCHEDULE_NOT_FOUND"
      )
        return res.status(404).json({ status: 404, msg: resService });
      else
        return res.status(201).json({ status: 200, msg: "SCHEDULE_DELETED" });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    }
  }
}
