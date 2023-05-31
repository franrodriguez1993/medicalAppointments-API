import express from "express";
import "dotenv/config";

/**   ROUTERS    **/
import staffRouter from "./modules/staff/staff.routes";
import SpecialtyRouter from "./modules/doctor/routes/specialty.routes";

const app = express();

app.use(express.json());
app.use("/api/v1/staff", staffRouter);
app.use("/api/v1/specialty", SpecialtyRouter);
export default app;
