import supertest from "supertest";

import { app } from "../../src/index";

import PatientDao from "../../src/modules/patient/patient.dao";
import { UserDao } from "../../src/modules/user/user.dao";

export const api = supertest(app);

export const daoPatient = new PatientDao();
export const daoUser = new UserDao();

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
