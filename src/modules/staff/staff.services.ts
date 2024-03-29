import StaffDao from "./staff.dao";
import { userOIF, userUpdateIF } from "../../interfaces/user/user.interface";
import {
  staffOIF,
  userStaffBIF,
  userStaffOIF,
} from "../../interfaces/staff/staff.interface";
import { v4 as uuid, validate as uuidValidate } from "uuid";

export default class StaffService {
  private daoStaff: StaffDao;

  constructor() {
    this.daoStaff = new StaffDao();
  }

  /**  REGISTER STAFF **/
  async register(data: userStaffBIF) {
    const id = uuid();
    const id_user = uuid();

    //CHECK USER:
    const user: userStaffOIF = await this.daoStaff.findUserByDNI(data.dni);

    //IF EXISTS:
    if (user) {
      if (user.staff) {
        throw new Error("DNI_IN_USE");
      } else {
        if (user.mail === data.mail) {
          const checkUsername = await this.daoStaff.findByUsername(
            data.username
          );
          if (checkUsername) throw new Error("USERNAME_IN_USE");
          const newStaff: staffOIF = await this.daoStaff.register({
            id,
            id_user: user.id,
            username: data.username,
            password: data.password,
            status: data.status,
            seniority: data.seniority,
            salary: data.salary,
          });

          if (!newStaff) throw new Error("ERROR_CREATING_STAFF");

          return newStaff.id;
        } else {
          throw new Error("USER_REGISTERED_WITH_OTHER_MAIL");
        }
      }
    }
    //IF NOT EXISTS:
    const checkMail = await this.daoStaff.findUserByMail(data.mail);
    if (checkMail) throw new Error("MAIL_IN_USE");

    const checkUsername = await this.daoStaff.findByUsername(data.username);
    if (checkUsername) throw new Error("USERNAME_IN_USE");

    const newUser: userOIF = await this.daoStaff.createUser({
      id: id_user,
      name: data.name,
      lastname: data.lastname,
      mail: data.mail,
      cellphone: data.cellphone,
      dni: data.dni,
      birthday: data.birthday,
    });

    if (!newUser) throw new Error("ERROR_CREATING_USER");

    const newStaff: staffOIF = await this.daoStaff.register({
      id,
      id_user,
      username: data.username,
      password: data.password,
      status: data.status,
      seniority: data.seniority,
      salary: data.salary,
    });

    if (!newStaff) throw new Error("ERROR_CREATING_STAFF");

    return newStaff.id;
  }

  /**  LOGIN STAFF **/
  async login(username: string, password: string) {
    const checkUser = await this.daoStaff.findByUsername(username);
    if (!checkUser) throw new Error("INVALID_CREDENTIALS");

    return await this.daoStaff.login(username, password);
  }

  /**  LIST STAFF  **/
  async list(page: number, size: number) {
    return await this.daoStaff.listStaff(page, size);
  }

  /**  UPDATE PERSONAL DATA STAFF **/
  async updatePersonalData(id: string, data: userUpdateIF) {
    if (!uuidValidate(id)) throw new Error("INVALID_ID");

    const staff: staffOIF = await this.daoStaff.findByID(id);

    if (!staff) throw new Error("STAFF_NOT_FOUND");

    return await this.daoStaff.updateUser(staff.user.id, data);
  }

  /**  CHANGE MAIL **/
  async changeMail(id: string, mail: string) {
    if (!uuidValidate(id)) throw new Error("INVALID_ID");

    const staff: staffOIF = await this.daoStaff.findByID(id);

    if (!staff) throw new Error("STAFF_NOT_FOUND");

    return await this.daoStaff.changeMail(staff.user.id, mail);
  }

  /**  CHANGE USERNAME **/
  async changeUsername(id: string, username: string) {
    if (!uuidValidate(id)) throw new Error("INVALID_ID");

    const staff: staffOIF = await this.daoStaff.findByID(id);
    if (!staff) throw new Error("STAFF_NOT_FOUND");

    if (staff.username === username) throw new Error("USERNAME_IS_THE_SAME");

    const checkUsername = await this.daoStaff.findByUsername(username);

    if (checkUsername) throw new Error("USERNAME_ALREADY_IN_USE");

    return await this.daoStaff.changeUsername(id, username);
  }

  /**  CHANGE PASSWORD **/
  async changePassword(id: string, password: string) {
    if (!uuidValidate(id)) throw new Error("INVALID_ID");

    const staff: staffOIF = await this.daoStaff.findByID(id);
    if (!staff) throw new Error("STAFF_NOT_FOUND");

    return await this.daoStaff.changePassword(id, password);
  }

  /**  FIND BY ID  **/
  async findByID(id: string) {
    if (!uuidValidate(id)) throw new Error("INVALID_ID");
    const staff: staffOIF = await this.daoStaff.findByID(id);
    if (!staff) throw new Error("STAFF_NOT_FOUND");
    return staff;
  }

  /**  UPDATE SALARY  **/
  async updateSalary(id: string, salary: number) {
    if (!uuidValidate(id)) throw new Error("INVALID_ID");
    const staff: staffOIF = await this.daoStaff.findByID(id);

    if (!staff) throw new Error("STAFF_NOT_FOUND");

    return await this.daoStaff.updateSalary(id, salary);
  }

  /**  UPDATE STATUS  **/
  async updateStatus(id: string, status: string) {
    const statusList = ["active", "vacation", "licence", "suspended"];

    if (!uuidValidate(id)) throw new Error("INVALID_ID");

    const staff: staffOIF = await this.daoStaff.findByID(id);
    if (!staff) throw new Error("STAFF_NOT_FOUND");

    if (!statusList.find((s) => s === status))
      throw new Error("INVALID_STATUS");

    return await this.daoStaff.updateStatus(id, status);
  }
}
