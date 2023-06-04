import { patientOIF } from "../../interfaces/patient/patient.interface";
import { sequelize } from "../../config/postgresql";
import { DataTypes, Model, BuildOptions } from "sequelize";
import Appointment from "../appointment/appointment.model";

type patientTypeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): patientOIF;
};

const Patient = sequelize.define("patients", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.STRING,
  },
  social_number: {
    type: DataTypes.STRING,
    unique: true,
  },
}) as patientTypeModel;

Patient.hasMany(Appointment, { foreignKey: "id_patient" });
Appointment.belongsTo(Patient, { foreignKey: "id_patient" });

export default Patient;
