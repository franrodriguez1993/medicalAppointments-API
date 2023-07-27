import { specialtiesBIF } from "../../../interfaces/doctor/specialties.interface";
import { v4 as uuid, validate as uuidValidate } from "uuid";
import SpecialtyDao from "../daos/specialty.dao";

const daoSpecialty = new SpecialtyDao();

export default class SpecialtyService {
  /**  CREATE SPECIALTY  **/
  async create(data: specialtiesBIF) {
    const checkName = await daoSpecialty.findByName(data.name);
    if (checkName) throw new Error("SPECIALTY_ALREADY_CREATED");

    const id = uuid();
    return await daoSpecialty.create({ ...data, id });
  }

  /**  DELETE SPECIALTY  **/
  async delete(id: string) {
    if (!uuidValidate(id)) throw new Error("INVALID_ID");
    return await daoSpecialty.delete(id);
  }
}
