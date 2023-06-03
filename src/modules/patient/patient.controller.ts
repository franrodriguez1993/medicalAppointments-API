import { Request, Response } from "express";
import PatientService from "./patient.services";
import logger from "../../utils/logger";

const service = new PatientService();

export default class PatientController {
  /**  CREATE  **/
  async create(req: Request, res: Response) {
    try {
      const data = req.body;

      const resService = await service.create(data);

      if (
        resService === "PATIENT_ALREADY_EXISTS" ||
        resService === "USER_REGISTERED_WITH_ANOTHER_MAIL" ||
        resService === "MAIL_IN_USE" ||
        resService === "SOCIAL_NUMBER_IN_USE"
      )
        return res.status(400).json({ status: 400, msg: resService });
      else if (
        resService === "ERROR_CREATING_USER" ||
        resService === "ERROR_CREATING_PATIENT"
      )
        return res.status(500).json({ status: 500, msg: resService });
      else
        return res
          .status(201)
          .json({ status: 201, msg: "PATIENT_CREATED", data: resService });
    } catch (e: any) {
      logger.error(e);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /**  FIND BY DNI**/
  async findByDNI(req: Request, res: Response) {
    try {
      const { dni } = req.params;

      const resService = await service.findByDNI(dni);

      if (resService === "INVALID_DNI" || resService === "USER_IS_NOT_PATIENT")
        return res.status(400).json({ status: 400, msg: resService });
      else if (resService === "PATIENT_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: resService });
      else
        return res
          .status(200)
          .json({ status: 200, msg: "OK", data: resService });
    } catch (e: any) {
      logger.error(e);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /**  UPDATE PERSONAL DATA  **/

  async updatePD(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;

      const resService = await service.updatePD(id, data);

      if (resService === "INVALID_ID")
        return res.status(400).json({ status: 400, msg: resService });
      else if (resService === "PATIENT_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: resService });
      else return res.status(201).json({ status: 201, msg: "PATIENT_UPDATED" });
    } catch (e: any) {
      logger.error(e);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /**  UPDATE SOCIAL NUMBER  **/
  async updateSN(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { social_number } = req.body;

      const resService = await service.updateSN(id, social_number);

      if (resService === "INVALID_ID")
        return res.status(400).json({ status: 400, msg: resService });
      else if (resService === "PATIENT_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: resService });

      return res.status(201).json({ status: 201, msg: "PATIENT_UPDATED" });
    } catch (e: any) {
      logger.error(e);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /**  CHANGE MAIL  **/
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
      else if (resService === "PATIENT_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: resService });
      else return res.status(201).json({ status: 201, msg: "PATIENT_UPDATED" });
    } catch (e: any) {
      logger.error(e);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }
}
