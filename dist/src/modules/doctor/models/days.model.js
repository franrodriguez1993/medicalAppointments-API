"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgresql_1 = require("../../../config/postgresql");
const sequelize_1 = require("sequelize");
const schedules_model_1 = __importDefault(require("./schedules.model"));
const appointment_model_1 = __importDefault(require("../../appointment/appointment.model"));
const Day = postgresql_1.sequelize.define("days", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
}, { freezeTableName: true, timestamps: false });
Day.hasMany(schedules_model_1.default, { foreignKey: "id_day" });
schedules_model_1.default.belongsTo(Day, { foreignKey: "id_day" });
Day.hasMany(appointment_model_1.default, { foreignKey: "id_day" });
appointment_model_1.default.belongsTo(Day, { foreignKey: "id_day" });
exports.default = Day;
