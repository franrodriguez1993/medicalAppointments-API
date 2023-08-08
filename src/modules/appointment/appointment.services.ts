import { v4 as uuid, validate as isValidUuid } from "uuid";
//DAOs:
import AppointmentDao from "./appointment.dao";
import DoctorDao from "../doctor/daos/doctor.dao";
import StaffDao from "../staff/staff.dao";
import PatientDao from "../patient/patient.dao";
import DayDao from "../doctor/daos/day.dao";

//Interfaces:
import { appointmentBIF } from "../../interfaces/appointment/appointment.interface";
import { staffOIF } from "../../interfaces/staff/staff.interface";
import { patientOIF } from "../../interfaces/patient/patient.interface";
import { doctorOIF } from "../../interfaces/doctor/doctor.interface";
import { dayOIF } from "../../interfaces/doctor/day.interface";

export default class AppointmentService {
  private daoAppointment: AppointmentDao;
  private daoStaff: StaffDao;
  private daoPatient: PatientDao;
  private daoDoctor: DoctorDao;
  private daoDay: DayDao;

  constructor() {
    this.daoAppointment = new AppointmentDao();
    this.daoStaff = new StaffDao();
    this.daoPatient = new PatientDao();
    this.daoDoctor = new DoctorDao();
    this.daoDay = new DayDao();
  }

  /**   CREATE **/
  async create(data: appointmentBIF) {
    if (
      !isValidUuid(data.id_doctor) ||
      !isValidUuid(data.id_patient) ||
      !isValidUuid(data.id_staff)
    ) {
      throw new Error("INVALID ID");
    }

    //Find users:
    const staff: staffOIF = await this.daoStaff.findByID(data.id_staff);
    if (!staff) throw new Error("STAFF_NOT_FOUND");

    const patient: patientOIF = await this.daoPatient.findByID(data.id_patient);
    if (!patient) throw new Error("PATIENT_NOT_FOUND");

    const doctor: doctorOIF = await this.daoDoctor.findByID(data.id_doctor);
    if (!doctor) throw new Error("DOCTOR_NOT_FOUND");

    const day: dayOIF = await this.daoDay.findByID(data.id_day);
    if (!day) throw new Error("DAY_NOT_FOUND");

    //Check Schedule:
    const checkDay = doctor.schedules.find((s) => s.id_day === data.id_day);
    if (!checkDay) throw new Error("INVALID_DOCTOR_SCHEDULE");

    //Check appointments:
    const listAppointments = await this.daoAppointment.listDayAppointment(
      data.id_doctor,
      data.date
    );
    if (listAppointments.length >= 10) throw new Error("MAXIMUM_APPOINTMENTS");

    //If everything is ok:
    return await this.daoAppointment.create({ ...data, id: `${uuid()}` });
  }

  /**   LIST APPOINTMENT **/
  async listAppointment(id_doctor: string, date: string) {
    if (!isValidUuid(id_doctor)) throw new Error("INVALID_ID");
    const formatedDate = date.split("-").join("/");

    const doctor: doctorOIF = await this.daoDoctor.findByID(id_doctor);
    if (!doctor) throw new Error("DOCTOR_NOT_FOUND");

    return await this.daoAppointment.listDayAppointment(
      id_doctor,
      formatedDate
    );
  }

  /**   DELETE APPOINTMENT **/
  async deleteOne(id: string) {
    if (!isValidUuid(id)) throw new Error("INVALID_ID");
    return await this.daoAppointment.deleteOne(id);
  }
}
