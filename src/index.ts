import app from "./app";
import configServer from "./config/configServer";
import { sequelize } from "./config/postgresql";
import logger from "./utils/logger";

const MODE = configServer.server.mode;
const PORT = configServer.server.port;

async function main() {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      if (MODE === "P") logger.info("Running in Production mode");
      else logger.info(`Running in development mode http://localhost:${PORT}`);
    });
  } catch (e: any) {
    logger.info(e);
    logger.error(e.message);
  }
}

main();
