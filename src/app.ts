import express from "express";
import "dotenv/config";

/**   ROUTERS    **/
import staffRouter from "./modules/staff/staff.routes";
import SpecialtyRouter from "./modules/doctor/routes/specialty.routes";
import doctorRouter from "./modules/doctor/routes/doctor.routes";
import routerPatient from "./modules/patient/patient.routes";

const app = express();

app.use(express.json());
app.use("/api/v1/staff", staffRouter);
app.use("/api/v1/specialty", SpecialtyRouter);
app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/patient", routerPatient);
export default app;
