import { specialtiesOIF } from "../../../interfaces/doctor/specialties.interface";
import { sequelize } from "../../../config/postgresql";
import { DataTypes, Model, BuildOptions } from "sequelize";

import Doctor from "./doctor.model";

type specialtyTypeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): specialtiesOIF;
};

const Specialty = sequelize.define(
  "specialties",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
) as specialtyTypeModel;

Specialty.hasMany(Doctor, { foreignKey: "id_specialty" });
Doctor.belongsTo(Specialty, { foreignKey: "id_specialty" });

export default Specialty;
