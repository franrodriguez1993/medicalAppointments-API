import Day from "../models/days.model";
export default class DayDao {
  /** CREATE **/
  async create(id: string, name: string) {
    try {
      return await Day.create({ id, name });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  /**  GET BY ID  **/
  async findByID(id: string) {
    try {
      return await Day.findOne({ where: { id } });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  /**  GET BY NAME  **/
  async findByName(name: string) {
    try {
      return await Day.findOne({ where: { name } });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }
}
