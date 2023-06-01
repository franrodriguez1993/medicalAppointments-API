import Day from "../models/days.model";
export default class DayDao {
  /** CREATE **/
  async create(id: string, name: string) {
    try {
      return await Day.create({ id, name });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**  GET BY ID  **/
  async findByID(id: string) {
    try {
      return await Day.findOne({ where: { id } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**  GET BY NAME  **/
  async findByName(name: string) {
    try {
      return await Day.findOne({ where: { name } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
