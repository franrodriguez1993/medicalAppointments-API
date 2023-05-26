import { Model } from "sequelize";

export interface userBodyIF {
  id?: string;
  name: string;
  lastname: string;
  mail: string;
  cellphone: string;
  dni: string;
  birthday: string;
}

export interface userObjectIF extends userBodyIF, Model<userBodyIF> {}
