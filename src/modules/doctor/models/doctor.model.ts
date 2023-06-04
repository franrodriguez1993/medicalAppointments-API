import { doctorOIF } from "../../../interfaces/doctor/doctor.interface";
import { sequelize } from "../../../config/postgresql";
import { DataTypes, Model, BuildOptions } from "sequelize";

import Schedule from "./schedules.model";
import Appointment from "../../appointment/appointment.model";

type doctorTypeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): doctorOIF;
};

const Doctor = sequelize.define(
  "doctors",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_specialty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
) as doctorTypeModel;

/**  JOIN  **/

Doctor.hasMany(Schedule, { foreignKey: "id_doctor" });
Schedule.belongsTo(Doctor, { foreignKey: "id_doctor" });

Doctor.hasMany(Appointment, { foreignKey: "id_doctor" });
Appointment.belongsTo(Doctor, { foreignKey: "id_doctor" });

export default Doctor;
