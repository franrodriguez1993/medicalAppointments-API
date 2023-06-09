"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const configServer_1 = __importDefault(require("./configServer"));
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize(configServer_1.default.postgresql.db, configServer_1.default.postgresql.username, configServer_1.default.postgresql.password, {
    host: configServer_1.default.postgresql.host,
    dialect: "postgres",
    logging: false,
    port: parseInt(configServer_1.default.postgresql.port),
});
