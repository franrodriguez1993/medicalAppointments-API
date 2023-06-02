import { doctorBIF } from "../../../interfaces/doctor/doctor.interface";
import {
  schedulesBIF,
  schedulesOIF,
} from "../../../interfaces/doctor/schedules.interface";
import { UserDao } from "../../user/user.dao";
import User from "../../user/user.model";
import Day from "../models/days.model";
import Doctor from "../models/doctor.model";
import Schedule from "../models/schedules.model";
import Specialty from "../models/specialties.model";

export default class DoctorDao extends UserDao {
  constructor() {
    super(Doctor);
  }
  /** CREATE DOCTOR  **/
  async create(data: doctorBIF) {
    try {
      return await Doctor.create(data);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** FIND BY ID  **/
  async findByID(id: string) {
    try {
      return await Doctor.findOne({
        where: { id },
        attributes: { exclude: ["id_user", "id_specialty"] },
        include: [
          {
            model: User,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: Specialty,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: Schedule,
            attributes: {
              exclude: ["createdAt", "updatedAt", "id_day", "id_doctor"],
            },
            include: [{ model: Day, attributes: { exclude: ["id"] } }],
          },
        ],
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** UPDATE SPECIALTY **/
  async updateSpecialty(id: string, id_specialty: string) {
    try {
      return await Doctor.update({ id_specialty }, { where: { id } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**  ADD SCHEDULE **/
  async addSchedule(data: schedulesBIF) {
    try {
      const check = await Schedule.findOne({
        where: { id_doctor: data.id_doctor, id_day: data.id_day },
      });

      if (check) return "SCHEDULE_ALREADY_EXISTS";

      return await Schedule.create(data);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**  UPDATE SCHEDULE **/
  async updateSchedule(data: schedulesBIF) {
    try {
      const schedule: schedulesOIF = await Schedule.findOne({
        where: { id_doctor: data.id_doctor, id_day: data.id_day },
      });

      if (!schedule) return "SCHEDULE_NOT_FOUND";

      return await Schedule.update(data, {
        where: { id: schedule.id },
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**  DELETE SCHEDULE **/
  async deleteSchedule(id_doctor: string, id_day: string) {
    try {
      const schedule: schedulesOIF = await Schedule.findOne({
        where: { id_doctor, id_day },
      });
      if (!schedule) return "SCHEDULE_NOT_FOUND";

      return await Schedule.destroy({ where: { id: schedule.id } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
