import User from "./user.model";
import { userBodyIF } from "../../interfaces/staff/user.interface";

export class UserDao {
  /**  CREATE USER  **/

  async create(data: userBodyIF) {
    try {
      return await User.create(data);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** --- FIND BY MAIL ---  **/
  async findByMail(mail: string) {
    try {
      return await User.findOne({ where: { mail } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** --- FIND BY DNI ---  **/
  async findByDNI(dni: string) {
    try {
      return await User.findOne({ where: { dni } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**  UPDATE USER  **/
  async update(id: string, data: userBodyIF) {
    try {
      return await User.update({ ...data }, { where: { id } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**  DELETE USER  **/
  async deleteOne(id: string) {
    try {
      return await User.destroy({ where: { id } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** --- DELETE ALL ---  **/
  async deleteAll() {
    try {
      return await User.destroy({ where: {} });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
