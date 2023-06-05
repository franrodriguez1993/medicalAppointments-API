import supertest from "supertest";

import { app } from "../../src/index";

import PatientDao from "../../src/modules/patient/patient.dao";
import StaffDao from "../../src/modules/staff/staff.dao";

export const api = supertest(app);

export const daoPatient = new PatientDao();
export const daoStaff = new StaffDao();

export const mockStaff = {
  name: "jane",
  lastname: "doe",
  mail: "janedoe@gmail.com",
  cellphone: "15541879",
  dni: "40908700",
  birthday: "1993/1/20",
  username: "jane1993",
  password: "147258",
  status: "active",
  seniority: "2020/5/20",
  salary: 2500.2,
};

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
  {
    name: "john",
    lastname: "connor",
    mail: "johnconnor@gmail.com",
    cellphone: "155674477",
    dni: "37785444",
    birthday: "1999/12/1",
    social_number: "000044447777",
  },
];
