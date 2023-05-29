import { staffOIF } from "../../interfaces/staff/staff.interface";
import { sequelize } from "../../config/postgresql";
import { DataTypes, Model, BuildOptions } from "sequelize";

type staffTypeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): staffOIF;
};

const Staff = sequelize.define(
  "staffs",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    seniority: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL(8, 2),
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
) as staffTypeModel;

export default Staff;
