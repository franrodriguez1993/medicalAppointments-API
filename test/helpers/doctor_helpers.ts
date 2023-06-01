import supertest from "supertest";

import SpecialtyDao from "../../src/modules/doctor/daos/specialty.dao";
import { app } from "../../src/index";
import DoctorDao from "../../src/modules/doctor/daos/doctor.dao";
import { UserDao } from "../../src/modules/user/user.dao";

export const daoDoctor = new DoctorDao();
export const daoSpecialty = new SpecialtyDao();
export const daoUser = new UserDao();
export const api = supertest(app);

export const SpecialtyMock = [
  { name: "cardiologist" },
  { name: "traumatologist" },
  { name: "orthopedist" },
  { name: "gastroenterologist" },
  { name: "dermatologist" },
];

export const DoctorMock = [
  {
    name: "jack",
    lastname: "sparrow",
    mail: "jack@gmail.com",
    cellphone: "155678987",
    dni: "56876564",
    birthday: "1980/12/1",
    id_specialty: "",
  },
  {
    name: "chris",
    lastname: "martins",
    mail: "martins@gmail.com",
    cellphone: "155678987",
    dni: "24857859",
    birthday: "1980/12/1",
    id_specialty: "",
  },
  {
    name: "indiana",
    lastname: "jones",
    mail: "jones@gmail.com",
    cellphone: "155678987",
    dni: "19874526",
    birthday: "1980/12/1",
    id_specialty: "",
  },
];
