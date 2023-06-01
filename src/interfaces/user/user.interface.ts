import { Model } from "sequelize";
import { staffBodyIF } from "../staff/staff.interface";
import { doctorOIF } from "../doctor/doctor.interface";

export interface userBIF {
  id?: string;
  name: string;
  lastname: string;
  mail: string;
  cellphone: string;
  dni: string;
  birthday: string;
}

export interface userUpdateIF {
  name?: string;
  lastname?: string;
  cellphone?: string;
  birthday?: string;
}

export interface userOIF extends userBIF, Model<userBIF> {
  staff: staffBodyIF;
  doctor: doctorOIF;
}
