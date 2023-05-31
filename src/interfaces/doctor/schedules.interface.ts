import { Model } from "sequelize";

export interface schedulesBIF {
  id?: string;
  id_day: string;
  id_doctor: string;
  hourIn: string;
  hourOut: string;
}

export interface schedulesOIF extends schedulesBIF, Model<schedulesBIF> {}
