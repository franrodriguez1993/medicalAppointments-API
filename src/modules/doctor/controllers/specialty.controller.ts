import { Request, Response } from "express";
import SpecialtyService from "../services/specialty.services";
import logger from "../../../utils/logger";
import ResponseEntity from "../../../utils/ResponseEntity";

const service = new SpecialtyService();

export default class SpecialtyController {
  /**  CREATE SPECIALTY  **/
  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const resService = await service.create(data);
      return res
        .status(201)
        .json(new ResponseEntity(201, "SPECIALTY_CREATED", resService.id));
    } catch (e: unknown) {
      if (e instanceof Error) {
        switch (e.message) {
          case "SPECIALTY_ALREADY_CREATED":
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

  /**  DELETE SPECIALTY  **/
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await service.delete(id);

      return res
        .status(200)
        .json(new ResponseEntity(200, "SPECIALTY_DELETED", null));
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
