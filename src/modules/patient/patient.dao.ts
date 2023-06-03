import { patientBIF } from "../../interfaces/patient/patient.interface";
import { UserDao } from "../user/user.dao";
import User from "../user/user.model";
import Patient from "./patient.model";

export default class PatientDao extends UserDao {
  constructor() {
    super(Patient);
  }
  /** CREATE **/
  async create(data: patientBIF) {
    try {
      return await Patient.create(data);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** FIND BY SOCIAL NUMBER **/
  async FindBySN(socialNumber: string) {
    try {
      return await Patient.findOne({ where: { social_number: socialNumber } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** FIND BY ID **/
  async findByID(id: string) {
    try {
      return await Patient.findOne({ where: { id }, include: { model: User } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** UPDATE SOCIAL NUMBER **/
  async updateSN(id: string, social_number: string) {
    try {
      return await Patient.update(
        { social_number: social_number },
        { where: { id } }
      );
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
