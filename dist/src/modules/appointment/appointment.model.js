"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgresql_1 = require("../../config/postgresql");
const sequelize_1 = require("sequelize");
const Appointment = postgresql_1.sequelize.define("appointments", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    id_doctor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    id_patient: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    id_staff: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    id_day: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
exports.default = Appointment;
