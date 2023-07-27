import {
  appointmentBIF,
  appointmentOIF,
} from "../../interfaces/appointment/appointment.interface";
import Patient from "../patient/patient.model";
import User from "../user/user.model";
import Appointment from "./appointment.model";

export default class AppointmentDao {
  /**  CREATE **/
  async create(data: appointmentBIF) {
    try {
      const appointment: appointmentOIF = await Appointment.findOne({
        where: {
          date: data.date,
          id_doctor: data.id_doctor,
          id_patient: data.id_patient,
          id_day: data.id_day,
        },
      });
      if (appointment) throw new Error("APPOINTMENT_ALREADY_EXISTS");

      return await Appointment.create(data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  /**  LIST DAY APPOINTMENT **/
  async listDayAppointment(id_doctor: string, date: string) {
    try {
      return await Appointment.findAll({
        where: { id_doctor, date },
        include: {
          model: Patient,
          include: [
            {
              model: User,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
          attributes: { exclude: ["createdAt", "updatedAt", "id_user"] },
        },
        attributes: { exclude: ["id_patient", "createdAt", "updatedAt"] },
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  /**  DELETE APPOITNMENT **/
  async deleteOne(id: string) {
    try {
      return await Appointment.destroy({ where: { id } });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }
}
