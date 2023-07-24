export default class DatabaseParameters {
  private host: string;
  private db: string;
  private user: string;
  private password: string;
  private port: number;

  constructor(mode: string) {
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

  getHost(): string {
    return this.host;
  }
  getDB(): string {
    return this.db;
  }
  getUser(): string {
    return this.user;
  }

  getPass(): string {
    return this.password;
  }
  getPort(): number {
    return this.port;
  }
}
