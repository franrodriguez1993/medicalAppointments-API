import { Model } from "sequelize";

/**  BODY APPOINTMENT FOR DAO  **/
export interface appointmentBIF {
  id?: string;
  date: string;
  id_doctor: string;
  id_patient: string;
  id_staff: string;
  id_day: string;
}

export interface appointmentOIF extends appointmentBIF, Model<appointmentBIF> {}
