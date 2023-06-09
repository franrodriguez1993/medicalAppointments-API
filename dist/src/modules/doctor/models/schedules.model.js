"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgresql_1 = require("../../../config/postgresql");
const sequelize_1 = require("sequelize");
const Schedule = postgresql_1.sequelize.define("schedules", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    id_day: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    id_doctor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    hourIn: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false,
    },
    hourOut: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: true,
});
exports.default = Schedule;
