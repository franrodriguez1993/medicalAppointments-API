import { Model } from "sequelize";
import { userBIF } from "../user/user.interface";

export interface patientBIF {
  id: string;
  id_user: string;
  social_number: string;
}

export interface userPatientBIF extends userBIF {
  social_number: string;
}

export interface patientOIF extends patientBIF, Model<patientBIF> {
  user: userBIF;
}
