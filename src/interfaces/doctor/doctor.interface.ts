import { Model } from "sequelize";

export interface doctorBIF {
  id_user: string;
  id_specialty: string;
}

export interface doctorOIF extends doctorBIF, Model<doctorBIF> {
  id: string;
}
