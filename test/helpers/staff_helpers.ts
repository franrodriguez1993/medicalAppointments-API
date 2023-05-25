import supertest from "supertest";
import { app } from "../../src/index";
import { StaffDao } from "../../src/modules/staff/staff.dao";

//DAO:
export const dao = new StaffDao();

//API:
export const api = supertest(app);

//DATA MOCK:

export const staffMock = [
  {
    name: "jack",
    lastname: "sparrow",
    mail: "jack@gmail.com",
    password: "123456",
    cellphone: "155678987",
    dni: "56876564",
  },
  {
    name: "mark",
    lastname: "june",
    mail: "mark@gmail.com",
    password: "147258",
    cellphone: "125478965",
    dni: "45213658",
  },
];
