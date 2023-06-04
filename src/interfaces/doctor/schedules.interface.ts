import { Model } from "sequelize";
import { dayOIF } from "./day.interface";

export interface schedulesBIF {
  id?: string;
  id_day?: string; //id of the day in database
  day?: string; //day name to search it in the database to get the id.
  id_doctor: string;
  hourIn: string;
  hourOut: string;
}

export interface schedulesOIF extends schedulesBIF, Model<schedulesBIF> {}
