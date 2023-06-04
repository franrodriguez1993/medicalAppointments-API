import { appointmentOIF } from "../../interfaces/appointment/appointment.interface";

import { sequelize } from "../../config/postgresql";
import { DataTypes, Model, BuildOptions } from "sequelize";

type appointmentTypeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): appointmentOIF;
};

const Appointment = sequelize.define("appointments", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_doctor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_patient: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_staff: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_day: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}) as appointmentTypeModel;

export default Appointment;
