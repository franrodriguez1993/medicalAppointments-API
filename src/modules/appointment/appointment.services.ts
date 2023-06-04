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

const daoAppointment = new AppointmentDao();
const daoStaff = new StaffDao();
const daoPatient = new PatientDao();
const daoDoctor = new DoctorDao();
const daoDay = new DayDao();

export default class AppointmentService {
  /**   CREATE **/
  async create(data: appointmentBIF) {
    if (
      !isValidUuid(data.id_doctor) ||
      !isValidUuid(data.id_patient) ||
      !isValidUuid(data.id_staff)
    ) {
      return "INVALID ID";
    }

    //Find users:
    const staff: staffOIF = await daoStaff.findByID(data.id_staff);
    if (!staff) return "STAFF_NOT_FOUND";

    const patient: patientOIF = await daoPatient.findByID(data.id_patient);
    if (!patient) return "PATIENT_NOT_FOUND";

    const doctor: doctorOIF = await daoDoctor.findByID(data.id_doctor);
    if (!doctor) return "DOCTOR_NOT_FOUND";

    const day: dayOIF = await daoDay.findByID(data.id_day);
    if (!day) return "DAY_NOT_FOUND";

    //Check Schedule:
    const checkDay = doctor.schedules.find((s) => s.id_day === data.id_day);
    if (!checkDay) return "INVALID_DOCTOR_SCHEDULE";

    //Check appointments:
    const listAppointments = await daoAppointment.listDayAppointment(
      data.id_doctor,
      data.date
    );
    if (listAppointments.length >= 10) return "MAXIMUM_APPOINTMENTS";

    //If everything is ok:
    return await daoAppointment.create({ ...data, id: `${uuid()}` });
  }

  /**   LIST APPOINTMENT **/
  async listAppointment(id_doctor: string, date: string) {
    if (!isValidUuid(id_doctor)) return "INVALID_ID";
    const formatedDate = date.split("-").join("/");

    const doctor: doctorOIF = await daoDoctor.findByID(id_doctor);
    if (!doctor) return "DOCTOR_NOT_FOUND";

    return await daoAppointment.listDayAppointment(id_doctor, formatedDate);
  }

  /**   DELETE APPOINTMENT **/
  async deleteOne(id: string) {
    if (!isValidUuid(id)) return "INVALID_ID";
    return await daoAppointment.deleteOne(id);
  }
}
