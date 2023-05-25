import { server } from "../src";

//helpers:
import { staffMock, api, dao } from "./helpers/staff_helpers";
const newStaff = {
  name: "henry",
  lastname: "campbell",
  mail: "henry@gmail.com",
  password: "147258",
  cellphone: "125487963",
  dni: "25667885",
};

beforeEach(async () => {
  await dao.deleteAll();
  await Promise.all(
    staffMock.map(async (s) => {
      await dao.register(s);
    })
  );
});
afterAll(() => {
  server.close();
});

describe("Register Staff", () => {
  test("Successfull register.", async () => {
    const response = await api.post("/api/v1/staff/register").send(newStaff);
    expect(response.body.msg).toEqual("STAFF_REGISTERED");
  });

  test("Mail already in use.", async () => {
    const response = await api
      .post("/api/v1/staff/register")
      .send({ ...newStaff, mail: staffMock[0].mail });
    expect(response.body.msg).toEqual("MAIL_IN_USE");
  });

  test("DNI already in use.", async () => {
    const response = await api
      .post("/api/v1/staff/register")
      .send({ ...newStaff, dni: staffMock[0].dni });
    expect(response.body.msg).toEqual("DNI_IN_USE");
  });

  test("Invalid password - too short", async () => {
    const response = await api
      .post("/api/v1/staff/register")
      .send({ ...newStaff, password: "1234" });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("Invalid password - too long", async () => {
    const response = await api
      .post("/api/v1/staff/register")
      .send({ ...newStaff, password: "12345678912jjfkooerwj342491jdfw1231" });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("Invalid DNI - too short", async () => {
    const response = await api.post("/api/v1/staff/register").send({
      ...newStaff,
      dni: "1234",
    });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("Invalid DNI - too long", async () => {
    const response = await api.post("/api/v1/staff/register").send({
      ...newStaff,
      dni: "123455555558744",
    });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("Invalid name - too short", async () => {
    const response = await api.post("/api/v1/staff/register").send({
      ...newStaff,
      name: "a",
    });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("Invalid name - too long", async () => {
    const response = await api.post("/api/v1/staff/register").send({
      ...newStaff,
      name: "ajqkwjeqweqweqieajdajsdjadjadaadaretertertetetetertreteteted",
    });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("Invalid lastname - too short", async () => {
    const response = await api.post("/api/v1/staff/register").send({
      ...newStaff,
      lastname: "a",
    });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("Invalid lastname - too long", async () => {
    const response = await api.post("/api/v1/staff/register").send({
      ...newStaff,
      lastname: "awqieoqwieqoweiqwoeiqwoeiqweoiqweoqieqtgdfretertertertet",
    });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });
});

describe("Login Staff", () => {
  test("login successfully", async () => {
    const response = await api
      .post("/api/v1/staff/login")
      .send({ mail: staffMock[0].mail, password: staffMock[0].password });
    expect(response.body.msg).toEqual("LOGIN_SUCCESSFULLY");
  });
  test("login error - user not found", async () => {
    const response = await api
      .post("/api/v1/staff/login")
      .send({ mail: "jonathan@gmail.com", password: "0123123" });
    expect(response.body.msg).toEqual("USER_NOT_FOUND");
  });
  test("login error - invalid credentials", async () => {
    const response = await api
      .post("/api/v1/staff/login")
      .send({ mail: staffMock[0].mail, password: "0123123" });
    expect(response.body.msg).toEqual("INVALID_CREDENTIALS");
  });

  test("login error - invalid mail ", async () => {
    const response = await api
      .post("/api/v1/staff/login")
      .send({ mail: "francisco", password: "0123123" });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });
  test("login error - invalid password ", async () => {
    const response = await api
      .post("/api/v1/staff/login")
      .send({ mail: staffMock[0].mail, password: "44" });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });
});
