import { specialtiesBIF } from "../../../interfaces/doctor/specialties.interface";
import { v4 as uuid, validate as uuidValidate } from "uuid";
import SpecialtyDao from "../daos/specialty.dao";

export default class SpecialtyService {
  private daoSpecialty: SpecialtyDao;

  constructor() {
    this.daoSpecialty = new SpecialtyDao();
  }

  /**  CREATE SPECIALTY  **/
  async create(data: specialtiesBIF) {
    const checkName = await this.daoSpecialty.findByName(data.name);
    if (checkName) throw new Error("SPECIALTY_ALREADY_CREATED");

    const id = uuid();
    return await this.daoSpecialty.create({ ...data, id });
  }

  /**  DELETE SPECIALTY  **/
  async delete(id: string) {
    if (!uuidValidate(id)) throw new Error("INVALID_ID");
    return await this.daoSpecialty.delete(id);
  }
}
