import supertest from "supertest";
import { app } from "../../src/index";
import StaffDao from "../../src/modules/staff/staff.dao";
import AppointmentDao from "../../src/modules/appointment/appointment.dao";
import DoctorDao from "../../src/modules/doctor/daos/doctor.dao";
import PatientDao from "../../src/modules/patient/patient.dao";
import SpecialtyDao from "../../src/modules/doctor/daos/specialty.dao";
import DayDao from "../../src/modules/doctor/daos/day.dao";

//DAOS:

export const daoStaff = new StaffDao();
export const daoAppointment = new AppointmentDao();
export const daoDoctor = new DoctorDao();
export const daoPatient = new PatientDao();
export const daoSpecialty = new SpecialtyDao();
export const daoDay = new DayDao();
//API:

export const api = supertest(app);

// MOCKS:

export const staffMock = [
  {
    name: "john",
    lastname: "doe",
    mail: "johndoe@gmail.com",
    cellphone: "15567879",
    dni: "45908765",
    birthday: "1990/6/16",
    username: "john1990",
    password: "147258",
    status: "active",
    seniority: "2017/5/15",
    salary: 3000.2,
  },
];

export const doctorMock = [
  {
    name: "jack",
    lastname: "sparrow",
    mail: "jack@gmail.com",
    cellphone: "155678987",
    dni: "56876564",
    birthday: "1980/12/1",
    id_specialty: "",
  },
];

export const specialtyMock = [{ name: "cardiologist" }];

export const patientMock = [
  {
    name: "jack",
    lastname: "sparrow",
    mail: "jack@gmail.com",
    cellphone: "155678987",
    dni: "56876564",
    birthday: "1980/12/1",
    social_number: "111144447777",
  },
];
