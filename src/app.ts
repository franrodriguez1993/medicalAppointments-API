import express from "express";
import "dotenv/config";
import configServer from "./config/configServer";

/**   ROUTERS    **/
import staffRouter from "./modules/staff/staff.routes";

const app = express();

app.use(express.json());
app.use("/api/v1/staff", staffRouter);
export default app;
