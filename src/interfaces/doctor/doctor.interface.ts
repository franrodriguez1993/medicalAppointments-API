import { Model } from "sequelize";
import { userBIF, userOIF } from "../user/user.interface";
import { specialtiesOIF } from "./specialties.interface";
import { schedulesBIF } from "./schedules.interface";

/**
 *  INTERFACE ONLY DOCTOR PROPERTIES - BODY
 **/
export interface doctorBIF {
  id?: string;
  id_user: string;
  id_specialty: string;
}

/**
 *  INTERFACE ONLY DOCTOR PROPERTIES - OBJECT
 **/
export interface doctorOIF extends doctorBIF, Model<doctorBIF> {
  user?: userOIF;
  specialty: specialtiesOIF;
  schedules: Array<schedulesBIF>;
}

/**
 *  INTERFACE USER DOCTOR PROPERTIES - BODY
 **/
export interface userDoctorBIF extends doctorBIF, userBIF {}
