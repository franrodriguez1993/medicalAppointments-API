import { schedulesOIF } from "../../../interfaces/doctor/schedules.interface";
import { sequelize } from "../../../config/postgresql";
import { DataTypes, Model, BuildOptions } from "sequelize";

type scheduleTypeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): schedulesOIF;
};

const Schedule = sequelize.define(
  "schedules",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    id_day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_doctor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hourIn: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    hourOut: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
) as scheduleTypeModel;

export default Schedule;
