import { server } from "../src";
import {
  api,
  patientMock,
  daoPatient,
  daoStaff,
  mockStaff,
} from "./helpers/patient_helpers";

import { v4 as uuid } from "uuid";

beforeEach(async () => {
  await daoPatient.deleteUsers();
  await daoStaff.deleteAll();
  await api.post("/api/v1/staff/register").send(mockStaff);
});

afterAll(async () => {
  server.close();
});

describe("create patient", () => {
  test("created successfully", async () => {
    const login = await api.post("/api/v1/staff/login/").send({
      username: mockStaff.username,
      password: mockStaff.password,
    });
    const response = await api
      .post("/api/v1/patient/")
      .send(patientMock[0])
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("PATIENT_CREATED");
  });

  test("patient already exists", async () => {
    const login = await api.post("/api/v1/staff/login/").send({
      username: mockStaff.username,
      password: mockStaff.password,
    });
    await api
      .post("/api/v1/patient/")
      .send(patientMock[0])
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    const response = await api
      .post("/api/v1/patient/")
      .send(patientMock[0])
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("PATIENT_ALREADY_EXISTS");
  });

  test("social number in use", async () => {
    const login = await api.post("/api/v1/staff/login/").send({
      username: mockStaff.username,
      password: mockStaff.password,
    });
    await api
      .post("/api/v1/patient/")
      .send(patientMock[1])
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    const response = await api
      .post("/api/v1/patient/")
      .send({ ...patientMock[0], social_number: patientMock[1].social_number })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("SOCIAL_NUMBER_IN_USE");
  });

  test("mail in use", async () => {
    const login = await api.post("/api/v1/staff/login/").send({
      username: mockStaff.username,
      password: mockStaff.password,
    });
    await api
      .post("/api/v1/patient/")
      .send(patientMock[1])
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    const response = await api
      .post("/api/v1/patient/")
      .send({
        ...patientMock[0],
        mail: patientMock[1].mail,
      })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("MAIL_IN_USE");
  });
});

describe("find by dni", () => {
  test("patient found it", async () => {
    const login = await api.post("/api/v1/staff/login/").send({
      username: mockStaff.username,
      password: mockStaff.password,
    });
    await api
      .post("/api/v1/patient/")
      .send(patientMock[0])
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    const response = await api
      .get(`/api/v1/patient/${patientMock[0].dni}`)
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("OK");
  });

  test("invalid id", async () => {
    const login = await api.post("/api/v1/staff/login/").send({
      username: mockStaff.username,
      password: mockStaff.password,
    });
    const response = await api
      .get(`/api/v1/patient/ssd11`)
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("INVALID_DNI");
  });

  test("patient not found", async () => {
    const login = await api.post("/api/v1/staff/login/").send({
      username: mockStaff.username,
      password: mockStaff.password,
    });
    const response = await api
      .get(`/api/v1/patient/25668885`)
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("PATIENT_NOT_FOUND");
  });
});

describe("update personal data", () => {
  test("updated", async () => {
    const login = await api.post("/api/v1/staff/login/").send({
      username: mockStaff.username,
      password: mockStaff.password,
    });
    const patient = await api
      .post("/api/v1/patient/")
      .send(patientMock[0])
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    const response = await api
      .put(`/api/v1/patient/${patient.body.data}/personal`)
      .send({
        name: "juan",
        lastname: "perdri",
        cellphone: "147852635",
        birthday: "1987/5/4",
      })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("PATIENT_UPDATED");
  });

  test("not found", async () => {
    const login = await api.post("/api/v1/staff/login/").send({
      username: mockStaff.username,
      password: mockStaff.password,
    });
    const response = await api
      .put(`/api/v1/patient/${uuid()}/personal`)
      .send({
        name: "juan",
        lastname: "perdri",
        cellphone: "147852635",
        birthday: "1987/5/4",
      })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("PATIENT_NOT_FOUND");
  });
});

describe("update social number", () => {
  test("updated", async () => {
    const login = await api.post("/api/v1/staff/login/").send({
      username: mockStaff.username,
      password: mockStaff.password,
    });
    const patient = await api
      .post("/api/v1/patient/")
      .send(patientMock[0])
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    const response = await api
      .put(`/api/v1/patient/${patient.body.data}/socialnumber`)
      .send({
        social_number: "14785296325",
      })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("PATIENT_UPDATED");
  });

  test("invalid id", async () => {
    const login = await api.post("/api/v1/staff/login/").send({
      username: mockStaff.username,
      password: mockStaff.password,
    });
    const response = await api
      .put(`/api/v1/patient/asdasdad1q/socialnumber`)
      .send({
        social_number: "14785296325",
      })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("INVALID_ID");
  });

  test("patient not found", async () => {
    const login = await api.post("/api/v1/staff/login/").send({
      username: mockStaff.username,
      password: mockStaff.password,
    });
    const response = await api
      .put(`/api/v1/patient/${uuid()}/socialnumber`)
      .send({
        social_number: "14785296325",
      })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("PATIENT_NOT_FOUND");
  });
});

describe("change mail", () => {
  test("mail updated", async () => {
    const login = await api.post("/api/v1/staff/login/").send({
      username: mockStaff.username,
      password: mockStaff.password,
    });
    const patient = await api
      .post("/api/v1/patient/")
      .send(patientMock[0])
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    const response = await api
      .put(`/api/v1/patient/${patient.body.data}/mail`)
      .send({
        mail: "franco@gmail.com",
      })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("PATIENT_UPDATED");
  });

  test("mail is the same", async () => {
    const login = await api.post("/api/v1/staff/login/").send({
      username: mockStaff.username,
      password: mockStaff.password,
    });
    const patient = await api
      .post("/api/v1/patient/")
      .send(patientMock[0])
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    const response = await api
      .put(`/api/v1/patient/${patient.body.data}/mail`)
      .send({
        mail: patientMock[0].mail,
      })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("MAIL_IS_THE_SAME");
  });

  test("mail in use", async () => {
    const login = await api.post("/api/v1/staff/login/").send({
      username: mockStaff.username,
      password: mockStaff.password,
    });

    const patient = await api
      .post("/api/v1/patient/")
      .send(patientMock[0])
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    await api
      .post("/api/v1/patient/")
      .send(patientMock[1])
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    const response = await api
      .put(`/api/v1/patient/${patient.body.data}/mail`)
      .send({
        mail: patientMock[1].mail,
      })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("MAIL_IN_USE");
  });
});
