import configServer from "./configServer";

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  configServer.postgresql.db,
  configServer.postgresql.username,
  configServer.postgresql.password,
  {
    host: configServer.postgresql.host,
    dialect: "postgres",
    logging: false,
    port: parseInt(configServer.postgresql.port),
  }
);
