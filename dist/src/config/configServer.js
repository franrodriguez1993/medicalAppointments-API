"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configServer = {
    server: {
        port: process.env.PORT,
        mode: process.env.MODE,
        jwt_secret: process.env.JWT_SECRET,
        jwt_expiration: process.env.JWT_EXPIRATION || "3h",
    },
    postgresql: {
        host: process.env.MODE === "T"
            ? process.env.POSTGRESQL_HOST_TEST
            : process.env.POSTGRESQL_HOST,
        db: process.env.MODE === "T"
            ? process.env.POSTGRESQL_DB_TEST
            : process.env.POSTGRESQL_DB,
        username: process.env.MODE === "T"
            ? process.env.POSTGRESQL_USERNAME_TEST
            : process.env.POSTGRESQL_USERNAME,
        password: process.env.MODE === "T"
            ? process.env.POSTGRESQL_PASSWORD_TEST
            : process.env.POSTGRESQL_PASSWORD,
        port: process.env.MODE === "T"
            ? process.env.POSTGRESQL_PORT_TEST
            : process.env.POSTGRESQL_PORT,
    },
};
exports.default = configServer;
