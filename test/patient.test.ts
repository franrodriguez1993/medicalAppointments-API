import { server } from "../src";
import { api, patientMock, daoPatient } from "./helpers/patient_helpers";
import { v4 as uuid } from "uuid";

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

describe("find by dni", () => {
  test("patient found it", async () => {
    await api.post("/api/v1/patient/").send(patientMock[0]);
    const response = await api.get(`/api/v1/patient/${patientMock[0].dni}`);
    expect(response.body.msg).toEqual("OK");
  });
  test("invalid id", async () => {
    const response = await api.get(`/api/v1/patient/ssd11`);
    expect(response.body.msg).toEqual("INVALID_DNI");
  });
  test("patient not found", async () => {
    const response = await api.get(`/api/v1/patient/25668885`);
    expect(response.body.msg).toEqual("PATIENT_NOT_FOUND");
  });
});

describe("update personal data", () => {
  test("updated", async () => {
    const patient = await api.post("/api/v1/patient/").send(patientMock[0]);

    const response = await api
      .put(`/api/v1/patient/${patient.body.data}/personal`)
      .send({
        name: "juan",
        lastname: "perdri",
        cellphone: "147852635",
        birthday: "1987/5/4",
      });
    expect(response.body.msg).toEqual("PATIENT_UPDATED");
  });

  test("not found", async () => {
    const response = await api.put(`/api/v1/patient/${uuid()}/personal`).send({
      name: "juan",
      lastname: "perdri",
      cellphone: "147852635",
      birthday: "1987/5/4",
    });
    expect(response.body.msg).toEqual("PATIENT_NOT_FOUND");
  });
});

describe("update social number", () => {
  test("updated", async () => {
    const patient = await api.post("/api/v1/patient/").send(patientMock[0]);

    const response = await api
      .put(`/api/v1/patient/${patient.body.data}/socialnumber`)
      .send({
        social_number: "14785296325",
      });
    expect(response.body.msg).toEqual("PATIENT_UPDATED");
  });

  test("invalid id", async () => {
    const response = await api
      .put(`/api/v1/patient/asdasdad1q/socialnumber`)
      .send({
        social_number: "14785296325",
      });
    expect(response.body.msg).toEqual("INVALID_ID");
  });

  test("patient not found", async () => {
    const response = await api
      .put(`/api/v1/patient/${uuid()}/socialnumber`)
      .send({
        social_number: "14785296325",
      });
    expect(response.body.msg).toEqual("PATIENT_NOT_FOUND");
  });
});

describe("change mail", () => {
  test("mail updated", async () => {
    const patient = await api.post("/api/v1/patient/").send(patientMock[0]);

    const response = await api
      .put(`/api/v1/patient/${patient.body.data}/mail`)
      .send({
        mail: "franco@gmail.com",
      });
    expect(response.body.msg).toEqual("PATIENT_UPDATED");
  });

  test("mail is the same", async () => {
    const patient = await api.post("/api/v1/patient/").send(patientMock[0]);

    const response = await api
      .put(`/api/v1/patient/${patient.body.data}/mail`)
      .send({
        mail: patientMock[0].mail,
      });
    expect(response.body.msg).toEqual("MAIL_IS_THE_SAME");
  });

  test("mail in use", async () => {
    const patient = await api.post("/api/v1/patient/").send(patientMock[0]);
    await api.post("/api/v1/patient/").send(patientMock[1]);
    const response = await api
      .put(`/api/v1/patient/${patient.body.data}/mail`)
      .send({
        mail: patientMock[1].mail,
      });
    expect(response.body.msg).toEqual("MAIL_IN_USE");
  });
});
