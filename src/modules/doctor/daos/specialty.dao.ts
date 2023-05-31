import Specialty from "../models/specialties.model";
import { specialtiesBIF } from "../../../interfaces/doctor/specialties.interface";

export default class SpecialtyDao {
  async create(data: specialtiesBIF) {
    try {
      return await Specialty.create(data);
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async findByName(name: string) {
    try {
      return await Specialty.findOne({ where: { name } });
    } catch (e: any) {
      throw new Error(e);
    }
  }
  async delete(id: string) {
    try {
      return await Specialty.destroy({ where: { id } });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async deleteAll() {
    try {
      return await Specialty.destroy({ where: {} });
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
