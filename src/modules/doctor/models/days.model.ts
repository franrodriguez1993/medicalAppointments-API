import { dayOIF } from "../../../interfaces/doctor/day.interface";
import { sequelize } from "../../../config/postgresql";
import { DataTypes, Model, BuildOptions } from "sequelize";
import Schedule from "./schedules.model";

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
Schedule.belongsTo(Day);

export default Day;
