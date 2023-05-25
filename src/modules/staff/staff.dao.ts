import Staff from "./staff.model";
import {
  staffBodyIF,
  staffObjectIF,
} from "../../interfaces/staff/staff.interface";
import { v4 as uuid } from "uuid";
import { encrypt, verifyEncrypt } from "../../utils/bcryptHandler";
import { generateToken } from "../../utils/jwtHandler";

export class StaffDao {
  /** --- REGISTER ---  **/
  async register(data: staffBodyIF) {
    try {
      const hashPass = await encrypt(data.password);

      const user = await Staff.create({
        ...data,
        password: hashPass,
        id: uuid(),
      });

      if (user) return "USER_REGISTERED";
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** --- FIND BY MAIL ---  **/
  async findByMail(mail: string) {
    try {
      return await Staff.findOne({ where: { mail } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** --- FIND BY DNI ---  **/
  async findByDNI(dni: string) {
    try {
      return await Staff.findOne({ where: { dni } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** --- FIND ALL ---  **/

  async list() {
    try {
      return await Staff.findAll({
        attributes: { exclude: ["password"] },
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** --- DELETE ALL ---  **/
  async deleteAll() {
    try {
      return await Staff.destroy({ where: {} });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** --- LOGIN ---  **/
  async login(mail: string, password: string) {
    try {
      const user = await Staff.findOne({ where: { mail } });
      if (!user) return "USER_NOT_FOUND";
      const checkPass = await verifyEncrypt(password, user.password);
      if (!checkPass) return "INVALID_CREDENTIALS";

      //everything ok:
      const jwt = generateToken(user.id);
      return { uid: user.id, jwt };
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
