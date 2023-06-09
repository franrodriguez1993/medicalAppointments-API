"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgresql_1 = require("../../../config/postgresql");
const sequelize_1 = require("sequelize");
const schedules_model_1 = __importDefault(require("./schedules.model"));
const appointment_model_1 = __importDefault(require("../../appointment/appointment.model"));
const Doctor = postgresql_1.sequelize.define("doctors", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    id_user: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    id_specialty: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: true,
});
/**  JOIN  **/
Doctor.hasMany(schedules_model_1.default, { foreignKey: "id_doctor" });
schedules_model_1.default.belongsTo(Doctor, { foreignKey: "id_doctor" });
Doctor.hasMany(appointment_model_1.default, { foreignKey: "id_doctor" });
appointment_model_1.default.belongsTo(Doctor, { foreignKey: "id_doctor" });
exports.default = Doctor;
