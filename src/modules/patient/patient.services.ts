import PatientDao from "./patient.dao";
import {
  patientOIF,
  userPatientBIF,
} from "../../interfaces/patient/patient.interface";
import { userOIF } from "../../interfaces/user/user.interface";
import { v4 as uuid } from "uuid";

const daoPatient = new PatientDao();

export default class PatientService {
  /**  CREATE  **/
  async create(data: userPatientBIF) {
    const id = uuid();
    const id_user = uuid();

    const user: userOIF = await daoPatient.findUserByDNI(data.dni);
    //IF USER EXISTS:
    if (user) {
      if (user.patient) {
        return "PATIENT_ALREADY_EXISTS";
      } else {
        if (user.mail !== data.mail) {
          return "USER_REGISTERED_WITH_ANOTHER_MAIL";
        } else {
          const patient: patientOIF = await daoPatient.create({
            id,
            id_user: user.id,
            social_number: data.social_number,
          });
          if (!patient) return "ERROR_CREATING_PATIENT";
          return patient.id;
        }
      }
    }

    //IF USER DOESN'T EXISTS:
    const checkMail = await daoPatient.findUserByMail(data.mail);
    if (checkMail) return "MAIL_IN_USE";

    const newUser: userOIF = await daoPatient.createUser({
      id: id_user,
      name: data.name,
      lastname: data.lastname,
      mail: data.mail,
      cellphone: data.cellphone,
      dni: data.dni,
      birthday: data.birthday,
    });

    if (!newUser) return "ERROR_CREATING_USER";

    const checkSN = await daoPatient.FindBySN(data.social_number);
    if (checkSN) return "SOCIAL_NUMBER_IN_USE";
    const newPatient: patientOIF = await daoPatient.create({
      id,
      id_user,
      social_number: data.social_number,
    });
    if (!newPatient) return "ERROR_CREATING_PATIENT";

    return newPatient.id;
  }
}
