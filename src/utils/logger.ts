import log4js from "log4js";
log4js.configure({
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

const logger = log4js.getLogger();

export default logger;
