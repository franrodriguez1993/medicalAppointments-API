"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = __importDefault(require("log4js"));
log4js_1.default.configure({
    appenders: {
        console: { type: "console" },
        debugFile: { type: "file", filename: "./debug.log" },
        warnFile: { type: "file", filename: "./warn.log" },
        errorFile: { type: "file", filename: "./error.log" },
        //
        loggerConsole: {
            type: "logLevelFilter",
            appender: "console",
            level: "info",
        },
        loggerDebug: {
            type: "logLevelFilter",
            appender: "debugFile",
            level: "info",
        },
        loggerError: {
            type: "logLevelFilter",
            appender: "errorFile",
            level: "error",
        },
    },
    categories: {
        default: {
            appenders: ["loggerConsole", "loggerDebug"],
            level: "all",
        },
        production: {
            appenders: ["loggerError"],
            level: "all",
        },
    },
});
const logger = log4js_1.default.getLogger();
exports.default = logger;
