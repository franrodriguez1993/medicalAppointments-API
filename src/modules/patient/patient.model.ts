import { patientOIF } from "../../interfaces/patient/patient.interface";
import { sequelize } from "../../config/postgresql";
import { DataTypes, Model, BuildOptions } from "sequelize";

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

export default Patient;
