"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseParameters_1 = __importDefault(require("./DatabaseParameters"));
const dbParameters = new DatabaseParameters_1.default(process.env.MODE);
const configServer = {
    server: {
        port: process.env.PORT,
        mode: process.env.MODE,
        jwt_secret: process.env.JWT_SECRET,
        jwt_expiration: process.env.JWT_EXPIRATION || "3h",
    },
    postgresql: {
        host: dbParameters.getHost(),
        db: dbParameters.getDB(),
        username: dbParameters.getUser(),
        password: dbParameters.getPass(),
        port: dbParameters.getPort().toString(),
    },
    cors: {
        url: process.env.CORS_URL,
    },
};
exports.default = configServer;
