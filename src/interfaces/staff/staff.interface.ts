import { Model } from "sequelize";

export interface staffBodyIF {
  id?: string;
  name: string;
  lastname: string;
  mail: string;
  password: string;
  cellphone: string;
  dni: string;
}

export interface staffObjectIF extends staffBodyIF, Model<staffBodyIF> {}
