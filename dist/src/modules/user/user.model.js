"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgresql_1 = require("../../config/postgresql");
const sequelize_1 = require("sequelize");
const staff_model_1 = __importDefault(require("../staff/staff.model"));
const doctor_model_1 = __importDefault(require("../doctor/models/doctor.model"));
const patient_model_1 = __importDefault(require("../patient/patient.model"));
const User = postgresql_1.sequelize.define("users", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    mail: {
        type: sequelize_1.DataTypes.STRING(90),
        allowNull: false,
        unique: true,
    },
    cellphone: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    dni: {
        type: sequelize_1.DataTypes.STRING(9),
        allowNull: false,
        unique: true,
    },
    birthday: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, { timestamps: true, freezeTableName: true });
/**  JOIN  **/
User.hasOne(staff_model_1.default, {
    foreignKey: "id_user",
    onDelete: "CASCADE",
    hooks: true,
});
staff_model_1.default.belongsTo(User, {
    foreignKey: "id_user",
    targetKey: "id",
    hooks: true,
    onDelete: "CASCADE",
});
User.hasOne(doctor_model_1.default, {
    foreignKey: "id_user",
    onDelete: "CASCADE",
    hooks: true,
});
doctor_model_1.default.belongsTo(User, {
    foreignKey: "id_user",
    targetKey: "id",
    hooks: true,
    onDelete: "CASCADE",
});
User.hasOne(patient_model_1.default, {
    foreignKey: "id_user",
    onDelete: "CASCADE",
    hooks: true,
});
patient_model_1.default.belongsTo(User, {
    foreignKey: "id_user",
    targetKey: "id",
    onDelete: "CASCADE",
});
exports.default = User;
