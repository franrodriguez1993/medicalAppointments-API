import PatientDao from "./patient.dao";
import {
  patientOIF,
  userPatientBIF,
} from "../../interfaces/patient/patient.interface";
import { userOIF, userUpdateIF } from "../../interfaces/user/user.interface";
import { v4 as uuid, validate as isValidUuid } from "uuid";

export default class PatientService {
  private daoPatient: PatientDao;

  constructor() {
    this.daoPatient = new PatientDao();
  }

  /**  CREATE  **/
  async create(data: userPatientBIF) {
    const id = uuid();
    const id_user = uuid();

    const user: userOIF = await this.daoPatient.findUserByDNI(data.dni);
    //IF USER EXISTS:
    if (user) {
      if (user.patient) {
        throw new Error("PATIENT_ALREADY_EXISTS");
      } else {
        if (user.mail !== data.mail) {
          throw new Error("USER_REGISTERED_WITH_ANOTHER_MAIL");
        } else {
          const checkSN = await this.daoPatient.FindBySN(data.social_number);
          if (checkSN) throw new Error("SOCIAL_NUMBER_IN_USE");
          const patient: patientOIF = await this.daoPatient.create({
            id,
            id_user: user.id,
            social_number: data.social_number,
          });
          if (!patient) throw new Error("ERROR_CREATING_PATIENT");

          return patient.id;
        }
      }
    }

    //IF USER DOESN'T EXISTS:
    const checkMail = await this.daoPatient.findUserByMail(data.mail);
    if (checkMail) throw new Error("MAIL_IN_USE");

    const newUser: userOIF = await this.daoPatient.createUser({
      id: id_user,
      name: data.name,
      lastname: data.lastname,
      mail: data.mail,
      cellphone: data.cellphone,
      dni: data.dni,
      birthday: data.birthday,
    });

    if (!newUser) throw new Error("ERROR_CREATING_USER");

    const checkSN = await this.daoPatient.FindBySN(data.social_number);

    if (checkSN) throw new Error("SOCIAL_NUMBER_IN_USE");

    const newPatient: patientOIF = await this.daoPatient.create({
      id,
      id_user,
      social_number: data.social_number,
    });
    if (!newPatient) throw new Error("ERROR_CREATING_PATIENT");

    return newPatient.id;
  }

  /**  LIST PATIENTS  **/
  async list(page: number, size: number) {
    return await this.daoPatient.list(page, size);
  }

  /**  FIND PATIENT  **/
  async findByDNI(dni: string) {
    const parsedDNI = parseInt(dni).toString();
    if (isNaN(parseInt(dni)) || parsedDNI.length < 7 || parsedDNI.length > 8)
      throw new Error("INVALID_DNI");

    const patient: userOIF = await this.daoPatient.findUserByDNI(dni);
    if (!patient) throw new Error("PATIENT_NOT_FOUND");
    if (!patient.patient) throw new Error("USER_IS_NOT_PATIENT");
    return patient;
  }

  /**  UPDATE PERSONAL DATA  **/
  async updatePD(id: string, data: userUpdateIF) {
    if (!isValidUuid(id)) throw new Error("INVALID_ID");
    const patient: patientOIF = await this.daoPatient.findByID(id);
    if (!patient) throw new Error("PATIENT_NOT_FOUND");
    return await this.daoPatient.updateUser(patient.user.id, data);
  }

  /**  UPDATE SOCIAL NUMBER  **/
  async updateSN(id: string, social_number: string) {
    if (!isValidUuid(id)) throw new Error("INVALID_ID");
    const patient: patientOIF = await this.daoPatient.findByID(id);
    if (!patient) throw new Error("PATIENT_NOT_FOUND");

    return await this.daoPatient.updateSN(id, social_number);
  }

  /**  UPDATE MAIL  **/
  async changeMail(id: string, mail: string) {
    if (!isValidUuid(id)) throw new Error("INVALID_ID");
    const patient: patientOIF = await this.daoPatient.findByID(id);
    if (!patient) throw new Error("PATIENT_NOT_FOUND");

    return await this.daoPatient.changeMail(patient.id_user, mail);
  }
}
