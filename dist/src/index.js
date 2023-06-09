"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const app_1 = __importDefault(require("./app"));
exports.app = app_1.default;
const configServer_1 = __importDefault(require("./config/configServer"));
const postgresql_1 = require("./config/postgresql");
const logger_1 = __importDefault(require("./utils/logger"));
const MODE = configServer_1.default.server.mode;
const PORT = configServer_1.default.server.port;
const server = app_1.default.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield postgresql_1.sequelize.sync({ alter: true });
    if (MODE === "P")
        logger_1.default.info("Running in Production mode");
    else
        logger_1.default.info(`Running in development mode http://localhost:${PORT}`);
}));
exports.server = server;
