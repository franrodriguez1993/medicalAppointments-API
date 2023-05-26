import express from "express";
import "dotenv/config";
import configServer from "./config/configServer";

/**   ROUTERS    **/

const app = express();

app.use(express.json());

export default app;
