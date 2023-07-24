"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DatabaseParameters {
    constructor(mode) {
        switch (mode) {
            case "T": {
                this.host = process.env.POSTGRESQL_HOST_TEST;
                this.db = process.env.POSTGRESQL_DB_TEST;
                this.user = process.env.POSTGRESQL_USERNAME_TEST;
                this.password = process.env.POSTGRESQL_PASSWORD_TEST;
                this.port = parseInt(process.env.POSTGRESQL_PORT_TEST);
                break;
            }
            case "P": {
                this.host = process.env.POSTGRESQL_HOST_PROD;
                this.db = process.env.POSTGRESQL_DB_PROD;
                this.user = process.env.POSTGRESQL_USERNAME_PROD;
                this.password = process.env.POSTGRESQL_PASSWORD_PROD;
                this.port = parseInt(process.env.POSTGRESQL_PORT_PROD);
                break;
            }
            default: {
                this.host = process.env.POSTGRESQL_HOST;
                this.db = process.env.POSTGRESQL_DB;
                this.user = process.env.POSTGRESQL_USERNAME;
                this.password = process.env.POSTGRESQL_PASSWORD;
                this.port = parseInt(process.env.POSTGRESQL_PORT);
                break;
            }
        }
    }
    getHost() {
        return this.host;
    }
    getDB() {
        return this.db;
    }
    getUser() {
        return this.user;
    }
    getPass() {
        return this.password;
    }
    getPort() {
        return this.port;
    }
}
exports.default = DatabaseParameters;
