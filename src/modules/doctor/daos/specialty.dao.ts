import Specialty from "../models/specialties.model";
import { specialtiesBIF } from "../../../interfaces/doctor/specialties.interface";

export default class SpecialtyDao {
  async create(data: specialtiesBIF) {
    try {
      return await Specialty.create(data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  async findByName(name: string) {
    try {
      return await Specialty.findOne({ where: { name } });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  async findByID(id: string) {
    try {
      return await Specialty.findOne({ where: { id } });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  async delete(id: string) {
    try {
      return await Specialty.destroy({ where: { id } });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  async deleteAll() {
    try {
      return await Specialty.destroy({ where: {} });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }
}
