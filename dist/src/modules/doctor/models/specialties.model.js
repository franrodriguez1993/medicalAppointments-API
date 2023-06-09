"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgresql_1 = require("../../../config/postgresql");
const sequelize_1 = require("sequelize");
const doctor_model_1 = __importDefault(require("./doctor.model"));
const Specialty = postgresql_1.sequelize.define("specialties", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
}, {
    freezeTableName: true,
    timestamps: true,
});
Specialty.hasMany(doctor_model_1.default, { foreignKey: "id_specialty" });
doctor_model_1.default.belongsTo(Specialty, { foreignKey: "id_specialty" });
exports.default = Specialty;
