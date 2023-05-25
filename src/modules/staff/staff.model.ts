import { sequelize } from "../../config/postgresql";
import { DataTypes, Model, BuildOptions } from "sequelize";
import { staffObjectIF } from "../../interfaces/staff/staff.interface";

type staffTypeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): staffObjectIF;
};

const Staff = sequelize.define(
  "staffs",
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
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
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
  },
  { timestamps: true, freezeTableName: true }
) as staffTypeModel;

export default Staff;
