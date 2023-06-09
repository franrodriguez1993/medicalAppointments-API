"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgresql_1 = require("../../config/postgresql");
const sequelize_1 = require("sequelize");
const appointment_model_1 = __importDefault(require("../appointment/appointment.model"));
const Patient = postgresql_1.sequelize.define("patients", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    id_user: {
        type: sequelize_1.DataTypes.STRING,
    },
    social_number: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
});
Patient.hasMany(appointment_model_1.default, { foreignKey: "id_patient" });
appointment_model_1.default.belongsTo(Patient, { foreignKey: "id_patient" });
exports.default = Patient;
