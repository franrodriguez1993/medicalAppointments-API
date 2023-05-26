import { UserDao } from "../../src/modules/user/user.dao";
import { v4 as uuid } from "uuid";
//DAO:
export const dao = new UserDao();

//DATA MOCK:

export const userMock = [
  {
    id: `${uuid()}`,
    name: "jack",
    lastname: "sparrow",
    mail: "jack@gmail.com",

    cellphone: "155678987",
    dni: "56876564",
    birthday: "1980/12/1",
  },
  {
    id: `${uuid()}`,
    name: "mark",
    lastname: "june",
    mail: "mark@gmail.com",
    cellphone: "125478965",
    dni: "45213658",
    birthday: "1980/8/15",
  },
];
