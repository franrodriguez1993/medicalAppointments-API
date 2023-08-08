import DatabaseParameters from "./DatabaseParameters";

const dbParameters = new DatabaseParameters(process.env.MODE);

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
  cors: {
    url: process.env.CORS_URL,
  },
};

export default configServer;
