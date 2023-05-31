import { Model } from "sequelize";

export interface specialtiesBIF {
  id?: string;
  name: string;
}
export interface specialtiesOIF extends specialtiesBIF, Model<specialtiesBIF> {}
