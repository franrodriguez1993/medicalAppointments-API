import { sequelize } from "../../config/postgresql";
import { DataTypes, Model, BuildOptions } from "sequelize";
import { userObjectIF } from "../../interfaces/staff/user.interface";

type userTypeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): userObjectIF;
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

export default User;
