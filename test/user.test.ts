import { server } from "../src";
import { v4 as uuid } from "uuid";
//helpers:
import { userMock, dao } from "./helpers/user_helpers";
const newStaff = {
  id: `${uuid()}`,
  name: "henry",
  lastname: "campbell",
  mail: "henry@gmail.com",
  cellphone: "125487963",
  dni: "25667885",
  birthday: "2000/7/28",
};

beforeEach(async () => {
  await dao.deleteAll();
  await Promise.all(
    userMock.map(async (s) => {
      await dao.create(s);
    })
  );
});
afterAll(() => {
  server.close();
});

describe("User", () => {
  test("Created", async () => {
    const user = await dao.create(newStaff);
    expect(user.mail).toEqual(newStaff.mail);
  });
  test("Find by mail", async () => {
    const user = await dao.findByMail(userMock[0].mail);
    expect(user.mail).toEqual(userMock[0].mail);
  });
  test("Find by dni", async () => {
    const user = await dao.findByDNI(userMock[0].dni);
    expect(user.dni).toEqual(userMock[0].dni);
  });

  test("delete one", async () => {
    await dao.deleteOne(userMock[0].id);
    const user = await dao.findByMail(userMock[0].mail);
    expect(user).toBeNull();
  });
});
