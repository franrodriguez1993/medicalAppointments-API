import { v4 as uuid, validate as isValidUuid } from "uuid";
import {
  doctorOIF,
  userDoctorBIF,
} from "../../../interfaces/doctor/doctor.interface";
import DoctorDao from "../daos/doctor.dao";
import { UserDao } from "../../user/user.dao";
import { userOIF, userUpdateIF } from "../../../interfaces/user/user.interface";
import { specialtiesOIF } from "../../../interfaces/doctor/specialties.interface";
import SpecialtyDao from "../daos/specialty.dao";
import { schedulesBIF } from "../../../interfaces/doctor/schedules.interface";
import DayDao from "../daos/day.dao";
import { dayOIF } from "../../../interfaces/doctor/day.interface";

const daoDoctor = new DoctorDao();
const daoUser = new UserDao();
const daoSpecialty = new SpecialtyDao();
const daoDay = new DayDao();

export default class DoctorService {
  /**  CREATE **/
  async create(data: userDoctorBIF) {
    const id = uuid();
    const id_user = uuid();
    //CHECK USER FOR USER:
    const user: userOIF = await daoUser.findByDNI(data.dni);

    //check for specialty:
    if (!isValidUuid(data.id_specialty)) return "INVALID_ID";
    const specialty: specialtiesOIF = await daoSpecialty.findByID(
      data.id_specialty
    );
    if (!specialty) return "SPECIALTY_NOT_FOUND";

    if (user) {
      //IF USER EXISTS:
      if (user.doctor) {
        return "DOCTOR_ALREADY_REGISTERED";
      } else {
        if (user.mail === data.mail) {
          const newDoc: doctorOIF = await daoDoctor.create({
            id,
            id_user: user.id,
            id_specialty: data.id_specialty,
          });
          if (!newDoc) return "ERROR_CREATING_DOCTOR";
          return newDoc.id;
        } else {
          return "USER_REGISTERED_WITH_OTHER_MAIL";
        }
      }
    }

    //IF USER DOESN'T EXISTS:
    const newUser: userOIF = await daoUser.create({
      id: id_user,
      name: data.name,
      lastname: data.lastname,
      mail: data.mail,
      cellphone: data.cellphone,
      dni: data.dni,
      birthday: data.birthday,
    });

    if (!newUser) return "ERROR_CREATING_USER";

    const newDoctor: doctorOIF = await daoDoctor.create({
      id,
      id_user,
      id_specialty: data.id_specialty,
    });

    if (!newDoctor) return "ERROR_CREATING_DOCTOR";
    return newDoctor.id;
  }

  /**  FIND BY ID **/
  async findByID(id: string) {
    if (!isValidUuid(id)) return "INVALID_ID";
    const doctor: doctorOIF = await daoDoctor.findByID(id);
    if (!doctor) return "DOCTOR_NOT_FOUND";
    return doctor;
  }

  /**  UPDATE DATA **/
  async updateData(id: string, data: userUpdateIF) {
    if (!isValidUuid(id)) return "INVALID_ID";
    const doctor: doctorOIF = await daoDoctor.findByID(id);

    if (!doctor) return "DOCTOR_NOT_FOUND";
    return await daoUser.update(id, data);
  }

  /**  UPDATE MAIL **/
  async updateMail(id: string, mail: string) {
    if (!isValidUuid(id)) return "INVALID_ID";

    const doctor: doctorOIF = await daoDoctor.findByID(id);
    if (!doctor) return "DOCTOR_NOT_FOUND";

    return await daoUser.changeMail(doctor.user.id, mail);
  }

  /**  UPDATE SPECIALTY **/
  async updateSpecialty(id: string, id_specialty: string) {
    if (!isValidUuid(id) || !isValidUuid(id_specialty)) return "INVALID_ID";

    const doctor: doctorOIF = await daoDoctor.findByID(id);
    if (!doctor) return "DOCTOR_NOT_FOUND";
    const specialty: specialtiesOIF = await daoSpecialty.findByID(id_specialty);
    if (!specialty) return "SPECIALTY_NOT_FOUND";

    return await daoDoctor.updateSpecialty(id, id_specialty);
  }

  /**  ADD SCHEDULE **/
  async addSchedule(data: schedulesBIF) {
    if (!isValidUuid(data.id_doctor)) return "INVALID_ID";

    const doctor: doctorOIF = await daoDoctor.findByID(data.id_doctor);
    if (!doctor) return "DOCTOR_NOT_FOUND";

    const day: dayOIF = await daoDay.findByName(data.day);
    if (!day) return "DAY_NOT_FOUND";

    return await daoDoctor.addSchedule({
      ...data,
      id: `${uuid()}`,
      id_day: day.id,
    });
  }

  /**  UPDATE SCHEDULE **/
  async updateSchedule(data: schedulesBIF) {
    if (!isValidUuid(data.id_doctor)) return "INVALID_ID";

    const doctor: doctorOIF = await daoDoctor.findByID(data.id_doctor);
    if (!doctor) return "DOCTOR_NOT_FOUND";

    const day: dayOIF = await daoDay.findByName(data.day);
    if (!day) return "DAY_NOT_FOUND";

    return await daoDoctor.updateSchedule({ ...data, id_day: day.id });
  }

  /**  DELETE SCHEDULE **/
  async deleteSchedule(id_doctor: string, name_day: string) {
    if (!isValidUuid(id_doctor)) return "INVALID_ID";
    const doctor: doctorOIF = await daoDoctor.findByID(id_doctor);
    if (!doctor) return "DOCTOR_NOT_FOUND";

    const day: dayOIF = await daoDay.findByName(name_day);
    if (!day) return "DAY_NOT_FOUND";

    return await daoDoctor.deleteSchedule(id_doctor, day.id);
  }
}
