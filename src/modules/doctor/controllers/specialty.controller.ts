import { Request, Response } from "express";
import SpecialtyService from "../services/specialty.services";
import logger from "../../../utils/logger";

const service = new SpecialtyService();

export default class SpecialtyController {
  /**  CREATE SPECIALTY  **/
  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const resService = await service.create(data);
      if (resService === "SPECIALTY_ALREADY_CREATED")
        return res.status(400).json({ status: 400, msg: resService });
      else
        return res
          .status(201)
          .json({ status: 201, msg: "SPECIALTY_CREATED", data: resService.id });
    } catch (e: unknown) {
      logger.error(e);
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    }
  }

  /**  DELETE SPECIALTY  **/
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const resService = await service.delete(id);

      if (resService === "INVALID_ID")
        return res.status(400).json({ status: 400, msg: resService });
      else
        return res.status(200).json({ status: 200, msg: "SPECIALTY_DELETED" });
    } catch (e: unknown) {
      logger.error(e);
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    }
  }
}
