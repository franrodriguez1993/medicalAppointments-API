import { server } from "../src";
import { api, patientMock, daoPatient } from "./helpers/patient_helpers";

beforeEach(async () => {
  await daoPatient.deleteUsers();
});

afterAll(async () => {
  server.close();
});

describe("create patient", () => {
  test("created successfully", async () => {
    const response = await api.post("/api/v1/patient/").send(patientMock[0]);
    expect(response.body.msg).toEqual("PATIENT_CREATED");
  });

  test("patient already exists", async () => {
    await api.post("/api/v1/patient/").send(patientMock[0]);
    const response = await api.post("/api/v1/patient/").send(patientMock[0]);
    expect(response.body.msg).toEqual("PATIENT_ALREADY_EXISTS");
  });

  test("social number in use", async () => {
    await api.post("/api/v1/patient/").send(patientMock[1]);
    const response = await api
      .post("/api/v1/patient/")
      .send({ ...patientMock[0], social_number: patientMock[1].social_number });
    expect(response.body.msg).toEqual("SOCIAL_NUMBER_IN_USE");
  });

  test("mail in use", async () => {
    await api.post("/api/v1/patient/").send(patientMock[1]);
    const response = await api.post("/api/v1/patient/").send({
      ...patientMock[0],
      mail: patientMock[1].mail,
    });
    expect(response.body.msg).toEqual("MAIL_IN_USE");
  });
});
