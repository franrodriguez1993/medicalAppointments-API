const configServer = {
  server: {
    port: process.env.PORT,
    mode: process.env.MODE,
  },
  postgresql: {
    host: process.env.POSTGRESQL_HOST,
    db: process.env.POSTGRESQL_DB,
    username: process.env.POSTGRESQL_USERNAME,
    password: process.env.POSTGRESQL_PASSWORD,
    port: process.env.POSTGRESQL_PORT,
  },
};

export default configServer;
