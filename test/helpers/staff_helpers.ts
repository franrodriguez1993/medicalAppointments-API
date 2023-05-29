import supertest from "supertest";
import StaffDao from "../../src/modules/staff/staff.dao";
import { UserDao } from "../../src/modules/user/user.dao";
import { v4 as uuid } from "uuid";
import { app } from "../../src/index";

export const api = supertest(app);

export const daoStaff = new StaffDao();
export const daoUser = new UserDao();
export const staffListMock = [
  {
    id: `${uuid()}`,
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
  {
    id: `${uuid()}`,
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
  },
];

export const newStaffMock = {
  name: "giancarlo",
  lastname: "lucciani",
  mail: "gian@gmail.com",
  cellphone: "15540079",
  dni: "30908700",
  birthday: "1999/1/20",
  username: "gian1993",
  password: "147258",
  status: "active",
  seniority: "2021/5/20",
  salary: 2200.2,
};
