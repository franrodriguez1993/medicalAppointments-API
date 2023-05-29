import Staff from "./staff.model";
import { staffBodyIF, staffOIF } from "../../interfaces/staff/staff.interface";
import { encrypt, verifyEncrypt } from "../../utils/bcryptHandler";
import { UserDao } from "../user/user.dao";
import { generateToken } from "../../utils/jwtHandler";

const daoUser = new UserDao();

export default class StaffDao {
  /**  REGISTER STAFF  **/
  async register(data: staffBodyIF) {
    try {
      const hashPass = await encrypt(data.password);
      return await Staff.create({ ...data, password: hashPass });
    } catch (e: any) {
      daoUser.deleteOne(data.id_user).then((res) => {
        throw new Error(e.message);
      });
    }
  }

  /** LOGIN USER **/
  async login(username: string, password: string) {
    try {
      const user: staffOIF = await Staff.findOne({ where: { username } });

      const checkPass = await verifyEncrypt(password, user.password);
      if (!checkPass) return "INVALID_CREDENTIALS";

      const jwt = generateToken(user.id);
      return { uid: user.id, jwt };
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** FIND BY ID **/
  async findByID(id: string) {
    try {
      return await Staff.findOne({ where: { id } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** FIND BY USERNAME **/
  async findByUsername(username: string) {
    try {
      return await Staff.findOne({ where: { username } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** CHANGE USERNAME **/
  async changeUsername(id: string, username: string) {
    try {
      return await Staff.update({ username }, { where: { id } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**  CHANGE PASSWORD  **/
  async changePassword(id: string, password: string) {
    try {
      const hashPass = await encrypt(password);
      return await Staff.update({ password: hashPass }, { where: { id } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**  UPDATE SALARY  **/
  async updateSalary(id: string, salary: number) {
    try {
      return await Staff.update({ salary }, { where: { id } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**  UPDATE STATUS  **/
  async updateStatus(id: string, status: string) {
    try {
      return await Staff.update({ status }, { where: { id } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** DELETE ALL **/
  async deleteAll() {
    try {
      return await Staff.destroy({ where: {} });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
