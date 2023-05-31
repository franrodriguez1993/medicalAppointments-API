import supertest from "supertest";

import SpecialtyDao from "../../src/modules/doctor/daos/specialty.dao";
import { app } from "../../src/index";

export const daoSpecialty = new SpecialtyDao();
export const api = supertest(app);
export const SpecialtyMock = [
  { name: "cardiologist" },
  { name: "traumatologist" },
  { name: "orthopedist" },
  { name: "gastroenterologist" },
  { name: "dermatologist" },
];
