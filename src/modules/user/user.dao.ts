import User from "./user.model";
import {
  userBIF,
  userOIF,
  userUpdateIF,
} from "../../interfaces/user/user.interface";
import Staff from "../staff/staff.model";
import Doctor from "../doctor/models/doctor.model";
import Patient from "../patient/patient.model";

export class UserDao {
  /**  CREATE USER  **/

  async create(data: userBIF) {
    try {
      return await User.create(data);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** --- FIND BY ID ---  **/
  async findByID(id: string) {
    try {
      return await User.findOne({
        where: { id },
        include: [{ model: Staff }, { model: Doctor }, { model: Patient }],
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** --- FIND BY MAIL ---  **/
  async findByMail(mail: string) {
    try {
      return await User.findOne({
        where: { mail },
        include: [{ model: Staff }, { model: Doctor }, { model: Patient }],
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** --- FIND BY DNI ---  **/
  async findByDNI(dni: string) {
    try {
      return await User.findOne({
        where: { dni },
        include: [{ model: Staff }, { model: Doctor }, { model: Patient }],
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**  UPDATE USER  **/
  async update(id: string, data: userUpdateIF) {
    try {
      return await User.update({ ...data }, { where: { id } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  async changeMail(id: string, mail: string) {
    try {
      const user: userOIF = await User.findOne({ where: { id } });
      if (user.mail === mail) return "MAIL_IS_THE_SAME";

      const checkMail = await User.findOne({ where: { mail } });
      if (checkMail) return "MAIL_IN_USE";

      return await User.update({ mail }, { where: { id } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**  DELETE USER  **/
  async deleteOne(id: string) {
    try {
      return await User.destroy({
        where: { id },
      });
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
