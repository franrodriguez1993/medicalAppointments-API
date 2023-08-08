import Staff from "./staff.model";
import { staffBodyIF, staffOIF } from "../../interfaces/staff/staff.interface";
import { encrypt, verifyEncrypt } from "../../utils/bcryptHandler";
import { UserDao } from "../user/user.dao";
import { generateToken } from "../../utils/jwtHandler";
import User from "../user/user.model";
import { paginatedData, pagination } from "../../utils/pagination";

export default class StaffDao extends UserDao {
  constructor() {
    super(Staff);
  }
  /**  REGISTER STAFF  **/
  async register(data: staffBodyIF) {
    try {
      const hashPass = await encrypt(data.password);
      return await Staff.create({ ...data, password: hashPass });
    } catch (e: unknown) {
      this.deleteUser(data.id_user).then((res) => {
        if (e instanceof Error) {
          throw new Error(e.message);
        } else throw new Error(e.toString());
      });
    }
  }

  /** LOGIN USER **/
  async login(username: string, password: string) {
    try {
      const user: staffOIF = await Staff.findOne({ where: { username } });

      const checkPass = await verifyEncrypt(password, user.password);
      if (!checkPass) throw new Error("INVALID_CREDENTIALS");

      const jwt = generateToken(user.id);
      return { uid: user.id, jwt };
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  /** FIND BY ID **/
  async findByID(id: string) {
    try {
      return await Staff.findOne({
        where: { id },
        attributes: { exclude: ["id_user", "password"] },
        include: {
          model: User,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  /**  LIST STAFFS  **/
  async listStaff(page: number, size: number) {
    try {
      const { limit, offset } = pagination(page, size);

      const data = await Staff.findAndCountAll({
        limit,
        offset,
        attributes: { exclude: ["id_user", "password"] },
        include: {
          model: User,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      });

      return paginatedData(data, page, limit);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  /** FIND BY USERNAME **/
  async findByUsername(username: string) {
    try {
      return await Staff.findOne({
        where: { username },
        attributes: { exclude: ["id_user", "password"] },
        include: {
          model: User,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  /** CHANGE USERNAME **/
  async changeUsername(id: string, username: string) {
    try {
      return await Staff.update({ username }, { where: { id } });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  /**  CHANGE PASSWORD  **/
  async changePassword(id: string, password: string) {
    try {
      const staff: staffOIF = await Staff.findOne({ where: { id } });
      const checkPass = await verifyEncrypt(password, staff.password);
      if (checkPass) throw new Error("PASSWORD_IS_THE_SAME");

      const hashPass = await encrypt(password);
      return await Staff.update({ password: hashPass }, { where: { id } });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  /**  UPDATE SALARY  **/
  async updateSalary(id: string, salary: number) {
    try {
      return await Staff.update({ salary }, { where: { id } });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  /**  UPDATE STATUS  **/
  async updateStatus(id: string, status: string) {
    try {
      return await Staff.update({ status }, { where: { id } });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }
}
