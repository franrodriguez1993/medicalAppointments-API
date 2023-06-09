"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgresql_1 = require("../../config/postgresql");
const sequelize_1 = require("sequelize");
const appointment_model_1 = __importDefault(require("../appointment/appointment.model"));
const Staff = postgresql_1.sequelize.define("staffs", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    id_user: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(60),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    seniority: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    salary: {
        type: sequelize_1.DataTypes.DECIMAL(8, 2),
    },
}, {
    freezeTableName: true,
    timestamps: true,
});
Staff.hasMany(appointment_model_1.default, { foreignKey: "id_staff" });
appointment_model_1.default.belongsTo(Staff, { foreignKey: "id_staff" });
exports.default = Staff;
