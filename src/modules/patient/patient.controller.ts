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
}
