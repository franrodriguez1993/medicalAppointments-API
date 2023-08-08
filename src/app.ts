import "dotenv/config";
import cors from "cors";
import express from "express";
import configServer from "./config/configServer";

/**   ROUTERS    **/
import staffRouter from "./modules/staff/staff.routes";
import SpecialtyRouter from "./modules/doctor/routes/specialty.routes";
import doctorRouter from "./modules/doctor/routes/doctor.routes";
import routerPatient from "./modules/patient/patient.routes";
import routerAppointment from "./modules/appointment/appointment.routes";

const app = express();

/**   CORS    **/
const urlcors: string = configServer.cors.url;

const urlList: Array<string> = [];
urlList.push(urlcors);

const corsOptions = {
  credentials: true,
  origin: function (origin: any, callback: any) {
    if (!origin) {
      return callback(null, true);
    }
    if (urlList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());

/** ENDPOINTS  **/
app.use("/api/v1/staff", staffRouter);
app.use("/api/v1/specialty", SpecialtyRouter);
app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/patient", routerPatient);
app.use("/api/v1/appointment", routerAppointment);

export default app;
