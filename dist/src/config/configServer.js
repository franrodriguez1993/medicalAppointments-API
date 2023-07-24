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
};
// const configServer = {
//   server: {
//     port: process.env.PORT,
//     mode: process.env.MODE,
//     jwt_secret: process.env.JWT_SECRET,
//     jwt_expiration: process.env.JWT_EXPIRATION || "3h",
//   },
//   postgresql: {
//     host:
//       process.env.MODE === "T"
//         ? process.env.POSTGRESQL_HOST_TEST
//         : process.env.POSTGRESQL_HOST,
//     db:
//       process.env.MODE === "T"
//         ? process.env.POSTGRESQL_DB_TEST
//         : process.env.POSTGRESQL_DB,
//     username:
//       process.env.MODE === "T"
//         ? process.env.POSTGRESQL_USERNAME_TEST
//         : process.env.POSTGRESQL_USERNAME,
//     password:
//       process.env.MODE === "T"
//         ? process.env.POSTGRESQL_PASSWORD_TEST
//         : process.env.POSTGRESQL_PASSWORD,
//     port:
//       process.env.MODE === "T"
//         ? process.env.POSTGRESQL_PORT_TEST
//         : process.env.POSTGRESQL_PORT,
//   },
// };
exports.default = configServer;
