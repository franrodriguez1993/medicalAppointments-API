import { sequelize } from "../../config/postgresql";
import { DataTypes, Model, BuildOptions } from "sequelize";
import { userOIF } from "../../interfaces/user/user.interface";
import Staff from "../staff/staff.model";
import Doctor from "../doctor/models/doctor.model";
import Patient from "../patient/patient.model";

type userTypeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): userOIF;
};

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING(90),
      allowNull: false,
      unique: true,
    },
    cellphone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING(9),
      allowNull: false,
      unique: true,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: true, freezeTableName: true }
) as userTypeModel;

/**  JOIN  **/
User.hasOne(Staff, {
  foreignKey: "id_user",
  onDelete: "CASCADE",
  hooks: true,
});
Staff.belongsTo(User, {
  foreignKey: "id_user",
  targetKey: "id",
  hooks: true,
  onDelete: "CASCADE",
});

User.hasOne(Doctor, {
  foreignKey: "id_user",
  onDelete: "CASCADE",
  hooks: true,
});
Doctor.belongsTo(User, {
  foreignKey: "id_user",
  targetKey: "id",
  hooks: true,
  onDelete: "CASCADE",
});

User.hasOne(Patient, {
  foreignKey: "id_user",
  onDelete: "CASCADE",
  hooks: true,
});
Patient.belongsTo(User, {
  foreignKey: "id_user",
  targetKey: "id",
  onDelete: "CASCADE",
});

export default User;
