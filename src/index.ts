import app from "./app";
import configServer from "./config/configServer";
import { sequelize } from "./config/postgresql";
import logger from "./utils/logger";

const MODE = configServer.server.mode;
const PORT = configServer.server.port;

const server = app.listen(PORT, async () => {
  await sequelize.sync({ alter: true });
  if (MODE === "P") logger.info("Running in Production mode");
  else logger.info(`Running in development mode http://localhost:${PORT}`);
});

export { app, server };
