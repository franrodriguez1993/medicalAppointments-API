import { v4 as uuid, validate as isValidUuid } from "uuid";
import {
  doctorOIF,
  userDoctorBIF,
} from "../../../interfaces/doctor/doctor.interface";
import DoctorDao from "../daos/doctor.dao";
import { userOIF, userUpdateIF } from "../../../interfaces/user/user.interface";
import { specialtiesOIF } from "../../../interfaces/doctor/specialties.interface";
import SpecialtyDao from "../daos/specialty.dao";
import { schedulesBIF } from "../../../interfaces/doctor/schedules.interface";
import DayDao from "../daos/day.dao";
import { dayOIF } from "../../../interfaces/doctor/day.interface";

export default class DoctorService {
  private daoDay: DayDao;
  private daoSpecialty: SpecialtyDao;
  private daoDoctor: DoctorDao;

  constructor() {
    this.daoDay = new DayDao();
    this.daoSpecialty = new SpecialtyDao();
    this.daoDoctor = new DoctorDao();
  }

  /**  CREATE **/
  async create(data: userDoctorBIF) {
    const id = uuid();
    const id_user = uuid();
    //CHECK USER FOR USER:
    const user: userOIF = await this.daoDoctor.findUserByDNI(data.dni);

    //check for specialty:
    if (!isValidUuid(data.id_specialty)) throw new Error("INVALID_ID");
    const specialty: specialtiesOIF = await this.daoSpecialty.findByID(
      data.id_specialty
    );
    if (!specialty) throw new Error("SPECIALTY_NOT_FOUND");

    if (user) {
      //IF USER EXISTS:
      if (user.doctor) {
        throw new Error("DOCTOR_ALREADY_REGISTERED");
      } else {
        if (user.mail === data.mail) {
          const newDoc: doctorOIF = await this.daoDoctor.create({
            id,
            id_user: user.id,
            id_specialty: data.id_specialty,
          });
          if (!newDoc) throw new Error("ERROR_CREATING_DOCTOR");
          return newDoc.id;
        } else {
          throw new Error("USER_REGISTERED_WITH_OTHER_MAIL");
        }
      }
    }

    //IF USER DOESN'T EXISTS:
    const newUser: userOIF = await this.daoDoctor.createUser({
      id: id_user,
      name: data.name,
      lastname: data.lastname,
      mail: data.mail,
      cellphone: data.cellphone,
      dni: data.dni,
      birthday: data.birthday,
    });

    if (!newUser) throw new Error("ERROR_CREATING_USER");

    const newDoctor: doctorOIF = await this.daoDoctor.create({
      id,
      id_user,
      id_specialty: data.id_specialty,
    });

    if (!newDoctor) throw new Error("ERROR_CREATING_DOCTOR");
    return newDoctor.id;
  }

  /**  LIST DOCTORS **/
  async list(page: number, size: number) {
    return await this.daoDoctor.list(page, size);
  }

  /**  FIND BY ID **/
  async findByID(id: string) {
    if (!isValidUuid(id)) throw new Error("INVALID_ID");
    const doctor: doctorOIF = await this.daoDoctor.findByID(id);
    if (!doctor) throw new Error("DOCTOR_NOT_FOUND");
    return doctor;
  }

  /**  UPDATE DATA **/
  async updateData(id: string, data: userUpdateIF) {
    if (!isValidUuid(id)) throw new Error("INVALID_ID");
    const doctor: doctorOIF = await this.daoDoctor.findByID(id);

    if (!doctor) throw new Error("DOCTOR_NOT_FOUND");
    return await this.daoDoctor.updateUser(id, data);
  }

  /**  UPDATE MAIL **/
  async updateMail(id: string, mail: string) {
    if (!isValidUuid(id)) throw new Error("INVALID_ID");

    const doctor: doctorOIF = await this.daoDoctor.findByID(id);
    if (!doctor) throw new Error("DOCTOR_NOT_FOUND");
    return await this.daoDoctor.changeMail(doctor.user.id, mail);
  }

  /**  UPDATE SPECIALTY **/
  async updateSpecialty(id: string, id_specialty: string) {
    if (!isValidUuid(id) || !isValidUuid(id_specialty))
      throw new Error("INVALID_ID");

    const doctor: doctorOIF = await this.daoDoctor.findByID(id);
    if (!doctor) throw new Error("DOCTOR_NOT_FOUND");
    const specialty: specialtiesOIF = await this.daoSpecialty.findByID(
      id_specialty
    );
    if (!specialty) throw new Error("SPECIALTY_NOT_FOUND");

    return await this.daoDoctor.updateSpecialty(id, id_specialty);
  }

  /**  ADD SCHEDULE **/
  async addSchedule(data: schedulesBIF) {
    if (!isValidUuid(data.id_doctor)) throw new Error("INVALID_ID");

    const doctor: doctorOIF = await this.daoDoctor.findByID(data.id_doctor);
    if (!doctor) throw new Error("DOCTOR_NOT_FOUND");

    const day: dayOIF = await this.daoDay.findByName(data.day);
    if (!day) throw new Error("DAY_NOT_FOUND");

    return await this.daoDoctor.addSchedule({
      ...data,
      id: `${uuid()}`,
      id_day: day.id,
    });
  }

  /**  UPDATE SCHEDULE **/
  async updateSchedule(data: schedulesBIF) {
    if (!isValidUuid(data.id_doctor)) throw new Error("INVALID_ID");

    const doctor: doctorOIF = await this.daoDoctor.findByID(data.id_doctor);
    if (!doctor) throw new Error("DOCTOR_NOT_FOUND");

    const day: dayOIF = await this.daoDay.findByName(data.day);
    if (!day) throw new Error("DAY_NOT_FOUND");

    return await this.daoDoctor.updateSchedule({ ...data, id_day: day.id });
  }

  /**  DELETE SCHEDULE **/
  async deleteSchedule(id_doctor: string, name_day: string) {
    if (!isValidUuid(id_doctor)) throw new Error("INVALID_ID");
    const doctor: doctorOIF = await this.daoDoctor.findByID(id_doctor);
    if (!doctor) throw new Error("DOCTOR_NOT_FOUND");

    const day: dayOIF = await this.daoDay.findByName(name_day);
    if (!day) throw new Error("DAY_NOT_FOUND");

    return await this.daoDoctor.deleteSchedule(id_doctor, day.id);
  }
}
