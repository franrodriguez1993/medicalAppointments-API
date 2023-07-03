import { patientBIF } from "../../interfaces/patient/patient.interface";
import { UserDao } from "../user/user.dao";
import User from "../user/user.model";
import Patient from "./patient.model";

import { pagination, paginatedData } from "../../utils/pagination";

export default class PatientDao extends UserDao {
  constructor() {
    super(Patient);
  }
  /** CREATE **/
  async create(data: patientBIF) {
    try {
      return await Patient.create(data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  /**  LIST PATIENTS  **/
  async list(page: number = 0, size: number = 0) {
    try {
      const { limit, offset } = pagination(page, size);

      const data = await Patient.findAndCountAll({
        limit,
        offset,
        attributes: { exclude: ["id_user"] },
        include: {
          model: User,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      });

      return paginatedData(data, page, limit);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  /** FIND BY SOCIAL NUMBER **/
  async FindBySN(socialNumber: string) {
    try {
      return await Patient.findOne({ where: { social_number: socialNumber } });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  /** FIND BY ID **/
  async findByID(id: string) {
    try {
      return await Patient.findOne({ where: { id }, include: { model: User } });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  /** UPDATE SOCIAL NUMBER **/
  async updateSN(id: string, social_number: string) {
    try {
      return await Patient.update(
        { social_number: social_number },
        { where: { id } }
      );
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }
}
