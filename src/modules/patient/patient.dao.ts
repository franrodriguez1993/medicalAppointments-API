import { patientBIF } from "../../interfaces/patient/patient.interface";
import Patient from "./patient.model";

export default class PatientDao {
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
}
