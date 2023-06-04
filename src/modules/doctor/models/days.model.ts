import { dayOIF } from "../../../interfaces/doctor/day.interface";
import { sequelize } from "../../../config/postgresql";
import { DataTypes, Model, BuildOptions } from "sequelize";
import Schedule from "./schedules.model";
import Appointment from "../../appointment/appointment.model";

type dayTypeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): dayOIF;
};

const Day = sequelize.define(
  "days",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  { freezeTableName: true, timestamps: false }
) as dayTypeModel;

Day.hasMany(Schedule, { foreignKey: "id_day" });
Schedule.belongsTo(Day, { foreignKey: "id_day" });

Day.hasMany(Appointment, { foreignKey: "id_day" });
Appointment.belongsTo(Day, { foreignKey: "id_day" });

export default Day;
