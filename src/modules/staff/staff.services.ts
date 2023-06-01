import StaffDao from "./staff.dao";
import { UserDao } from "../user/user.dao";
import { userOIF, userUpdateIF } from "../../interfaces/user/user.interface";
import {
  staffOIF,
  userStaffBIF,
  userStaffOIF,
} from "../../interfaces/staff/staff.interface";
import { v4 as uuid, validate as uuidValidate } from "uuid";
import { verifyEncrypt } from "../../utils/bcryptHandler";

const daouser = new UserDao();
const daoStaff = new StaffDao();

export default class StaffService {
  /**  REGISTER STAFF **/
  async register(data: userStaffBIF) {
    const id = uuid();
    const id_user = uuid();

    //CHECK USER:
    const user: userStaffOIF = await daouser.findByDNI(data.dni);

    //IF EXISTS:
    if (user) {
      if (user.staff) {
        return "DNI_IN_USE";
      } else {
        if (user.mail === data.mail) {
          const checkUsername = await daoStaff.findByUsername(data.username);
          if (checkUsername) return "USERNAME_IN_USE";
          const newStaff: staffOIF = await daoStaff.register({
            id,
            id_user: user.id,
            username: data.username,
            password: data.password,
            status: data.status,
            seniority: data.seniority,
            salary: data.salary,
          });

          if (!newStaff) return "ERROR_CREATING_STAFF";
          return newStaff.id;
        } else {
          return "USER_REGISTERED_WITH_OTHER_MAIL";
        }
      }
    }
    //IF NOT EXISTS:
    const checkMail = await daouser.findByMail(data.mail);
    if (checkMail) return "MAIL_IN_USE";

    const checkUsername = await daoStaff.findByUsername(data.username);
    if (checkUsername) return "USERNAME_IN_USE";

    const newUser: userOIF = await daouser.create({
      id: id_user,
      name: data.name,
      lastname: data.lastname,
      mail: data.mail,
      cellphone: data.cellphone,
      dni: data.dni,
      birthday: data.birthday,
    });

    if (!newUser) return "ERROR_CREATING_USER";

    const newStaff: staffOIF = await daoStaff.register({
      id,
      id_user,
      username: data.username,
      password: data.password,
      status: data.status,
      seniority: data.seniority,
      salary: data.salary,
    });

    if (!newStaff) return "ERROR_CREATING_STAFF";
    return newStaff.id;
  }

  /**  LOGIN STAFF **/
  async login(username: string, password: string) {
    const checkUser = await daoStaff.findByUsername(username);
    if (!checkUser) return "INVALID_CREDENTIALS";

    return await daoStaff.login(username, password);
  }

  /**  UPDATE PERSONAL DATA STAFF **/
  async updatePersonalData(id: string, data: userUpdateIF) {
    if (!uuidValidate(id)) return "INVALID_ID";

    const staff: staffOIF = await daoStaff.findByID(id);

    if (!staff) return "STAFF_NOT_FOUND";

    return await daouser.update(staff.user.id, data);
  }

  /**  CHANGE MAIL **/
  async changeMail(id: string, mail: string) {
    if (!uuidValidate(id)) return "INVALID_ID";

    const staff: staffOIF = await daoStaff.findByID(id);

    if (!staff) return "STAFF_NOT_FOUND";

    return await daouser.changeMail(staff.user.id, mail);
  }

  /**  CHANGE USERNAME **/
  async changeUsername(id: string, username: string) {
    if (!uuidValidate(id)) return "INVALID_ID";

    const staff: staffOIF = await daoStaff.findByID(id);
    if (!staff) return "STAFF_NOT_FOUND";

    if (staff.username === username) return "USERNAME_IS_THE_SAME";

    const checkUsername = await daoStaff.findByUsername(username);

    if (checkUsername) return "USERNAME_ALREADY_IN_USE";

    return await daoStaff.changeUsername(id, username);
  }

  /**  CHANGE PASSWORD **/
  async changePassword(id: string, password: string) {
    if (!uuidValidate(id)) return "INVALID_ID";

    const staff: staffOIF = await daoStaff.findByID(id);
    if (!staff) return "STAFF_NOT_FOUND";

    return await daoStaff.changePassword(id, password);
  }

  /**  FIND BY ID  **/
  async findByID(id: string) {
    if (!uuidValidate(id)) return "INVALID_ID";
    const staff: staffOIF = await daoStaff.findByID(id);
    if (!staff) return "STAFF_NOT_FOUND";
    return staff;
  }

  /**  UPDATE SALARY  **/
  async updateSalary(id: string, salary: number) {
    if (!uuidValidate(id)) return "INVALID_ID";
    const staff: staffOIF = await daoStaff.findByID(id);

    if (!staff) return "STAFF_NOT_FOUND";

    return await daoStaff.updateSalary(id, salary);
  }

  /**  UPDATE STATUS  **/
  async updateStatus(id: string, status: string) {
    const statusList = ["active", "vacation", "licence", "suspended"];

    if (!uuidValidate(id)) return "INVALID_ID";

    const staff: staffOIF = await daoStaff.findByID(id);
    if (!staff) return "STAFF_NOT_FOUND";

    if (!statusList.find((s) => s === status)) return "INVALID_STATUS";

    return await daoStaff.updateStatus(id, status);
  }
}
