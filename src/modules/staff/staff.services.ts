import { StaffDao } from "./staff.dao";

import { staffBodyIF } from "../../interfaces/staff/staff.interface";

const daoStaff = new StaffDao();

export default class StaffService {
  /** --- REGISTER ---  **/
  async register(data: staffBodyIF) {
    const checkMail = await daoStaff.findByMail(data.mail);
    if (checkMail) return "MAIL_IN_USE";

    const checkDNI = await daoStaff.findByDNI(data.dni);
    if (checkDNI) return "DNI_IN_USE";

    return await daoStaff.register({ ...data });
  }

  /**   LOGIN   **/
  async login(mail: string, password: string) {
    return await daoStaff.login(mail, password);
  }
}
