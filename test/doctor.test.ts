import { server } from "../src";

import { specialtiesOIF } from "../src/interfaces/doctor/specialties.interface";
import {
  api,
  SpecialtyMock,
  daoSpecialty,
  daoDoctor,
  DoctorMock,
  mockStaff,
} from "./helpers/doctor_helpers";
import { v4 as uuid } from "uuid";

beforeEach(async () => {
  await daoDoctor.deleteUsers();
  await daoSpecialty.deleteAll();
  await daoDoctor.deleteAll();
  await api.post("/api/v1/staff/register").send(mockStaff);

  const login = await api
    .post("/api/v1/staff/login")
    .send({ username: mockStaff.username, password: mockStaff.password });

  //specialties:
  await Promise.all(
    SpecialtyMock.map(async (s) => {
      await api
        .post("/api/v1/specialty")
        .send(s)
        .set("Authorization", `Bearer ${login.body.data.jwt}`);
    })
  );
});
afterAll(() => {
  server.close();
});

describe("create specialty", () => {
  test("created successfully", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });

    const response = await api
      .post("/api/v1/specialty")
      .send({ name: "pediatrician" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("SPECIALTY_CREATED");
  });
  test("Already created", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });

    await api
      .post("/api/v1/specialty")
      .send({ name: SpecialtyMock[0].name })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    const response = await api
      .post("/api/v1/specialty")
      .send({ name: SpecialtyMock[0].name })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("SPECIALTY_ALREADY_CREATED");
  });
  test("Name too short", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });
    const response = await api
      .post("/api/v1/specialty")
      .send({ name: "a" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("Name too long", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });
    const response = await api
      .post("/api/v1/specialty")
      .send({ name: "aasdadasdasdaqweoqwieqwoeiqadkasdkasjdkasjdaskdja" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });
  test("Name is not a string", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });

    const response = await api
      .post("/api/v1/specialty")
      .send({ name: 12 })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });
});
describe("delete Specialty", () => {
  test("deleted successfully", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });

    const specialty: specialtiesOIF = await daoSpecialty.findByName(
      SpecialtyMock[0].name
    );
    const response = await api
      .delete(`/api/v1/specialty/${specialty.id}`)
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("SPECIALTY_DELETED");
  });

  test("invalid id", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });
    const response = await api
      .delete(`/api/v1/specialty/2313`)
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("INVALID_ID");
  });
});

describe("Add doctor", () => {
  test("created successfully", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });
    const specialty: specialtiesOIF = await daoSpecialty.findByName(
      "cardiologist"
    );
    const response = await api
      .post("/api/v1/doctor")
      .send({ ...DoctorMock[0], id_specialty: specialty.id })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    expect(response.body.msg).toEqual("DOCTOR_REGISTERED");
  });

  test("invalid specialty id", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });
    const response = await api
      .post("/api/v1/doctor")
      .send({ ...DoctorMock[0], id_specialty: "jadasjdakjdijeweirjweirjwer" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    expect(response.body.msg).toEqual("INVALID_ID");
  });

  test("specialty not found", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });

    const response = await api
      .post("/api/v1/doctor")
      .send({
        ...DoctorMock[0],
        id_specialty: `${uuid()}`,
      })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    expect(response.body.msg).toEqual("SPECIALTY_NOT_FOUND");
  });

  test("already registered", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });

    const specialty: specialtiesOIF = await daoSpecialty.findByName(
      "cardiologist"
    );
    await api
      .post("/api/v1/doctor")
      .send({ ...DoctorMock[0], id_specialty: specialty.id })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    const response = await api
      .post("/api/v1/doctor")
      .send({ ...DoctorMock[0], id_specialty: specialty.id })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    expect(response.body.msg).toEqual("DOCTOR_ALREADY_REGISTERED");
  });
});

describe("update data", () => {
  test("update successfully", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });

    const specialty: specialtiesOIF = await daoSpecialty.findByName(
      "cardiologist"
    );
    const doctor = await api
      .post("/api/v1/doctor")
      .send({ ...DoctorMock[0], id_specialty: specialty.id })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    const response = await api
      .put(`/api/v1/doctor/${doctor.body.data}/data`)
      .send({
        name: "horacio",
        lastname: "gonzales",
        cellphone: "147856895",
        birthday: "1987/10/25",
      })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("DOCTOR_UPDATED");
  });

  test("doctor not found", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });

    const response = await api
      .put(`/api/v1/doctor/${uuid()}/data`)
      .send({
        name: "horacio",
        lastname: "gonzales",
        cellphone: "147856895",
        birthday: "1987/10/25",
      })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("DOCTOR_NOT_FOUND");
  });

  test("invalid id", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });

    const response = await api
      .put(`/api/v1/doctor/jjsdfsdjfsie/data`)
      .send({
        name: "horacio",
        lastname: "gonzales",
        cellphone: "147856895",
        birthday: "1987/10/25",
      })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("INVALID_ID");
  });
});

describe("update mail", () => {
  test("mail updated successfully", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });

    const specialty: specialtiesOIF = await daoSpecialty.findByName(
      "cardiologist"
    );
    const doctor = await api
      .post("/api/v1/doctor")
      .send({ ...DoctorMock[0], id_specialty: specialty.id })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    const response = await api
      .put(`/api/v1/doctor/${doctor.body.data}/mail`)
      .send({
        mail: "murcia@gmail.com",
      })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("DOCTOR_UPDATED");
  });

  test("mail is the same", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });

    const specialty: specialtiesOIF = await daoSpecialty.findByName(
      "cardiologist"
    );
    const doctor = await api
      .post("/api/v1/doctor")
      .send({ ...DoctorMock[0], id_specialty: specialty.id })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    const response = await api
      .put(`/api/v1/doctor/${doctor.body.data}/mail`)
      .send({
        mail: DoctorMock[0].mail,
      })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("MAIL_IS_THE_SAME");
  });

  test("mail in use", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });

    const specialty: specialtiesOIF = await daoSpecialty.findByName(
      "cardiologist"
    );
    const doctor = await api
      .post("/api/v1/doctor")
      .send({ ...DoctorMock[0], id_specialty: specialty.id })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    await api
      .post("/api/v1/doctor")
      .send({ ...DoctorMock[1], id_specialty: specialty.id })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    const response = await api
      .put(`/api/v1/doctor/${doctor.body.data}/mail`)
      .send({
        mail: DoctorMock[1].mail,
      })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("MAIL_IN_USE");
  });
});

describe("update specialty", () => {
  test("specialty updated", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });

    const specialty: specialtiesOIF = await daoSpecialty.findByName(
      "cardiologist"
    );
    const newSpecialty: specialtiesOIF = await daoSpecialty.findByName(
      "traumatologist"
    );
    const doctor = await api
      .post("/api/v1/doctor")
      .send({ ...DoctorMock[0], id_specialty: specialty.id })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    const response = await api
      .put(`/api/v1/doctor/${doctor.body.data}/specialty`)
      .send({
        id_specialty: newSpecialty.id,
      })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("DOCTOR_UPDATED");
  });

  test("specialty not found", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });

    const specialty: specialtiesOIF = await daoSpecialty.findByName(
      "cardiologist"
    );

    const doctor = await api
      .post("/api/v1/doctor")
      .send({ ...DoctorMock[0], id_specialty: specialty.id })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    const response = await api
      .put(`/api/v1/doctor/${doctor.body.data}/specialty`)
      .send({
        id_specialty: `${uuid()}`,
      })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("SPECIALTY_NOT_FOUND");
  });
});

describe("add schedule", () => {
  test("created successfully", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });

    const specialty: specialtiesOIF = await daoSpecialty.findByName(
      "cardiologist"
    );
    const doctor = await api
      .post("/api/v1/doctor")
      .send({ ...DoctorMock[0], id_specialty: specialty.id })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    const response = await api
      .post(`/api/v1/doctor/${doctor.body.data}/schedule`)
      .send({ day: "friday", hourIn: "08:00:00", hourOut: "15:00:00" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    expect(response.body.msg).toEqual("SCHEDULE_ADDED");
  });

  test("Invalid day", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });

    const specialty: specialtiesOIF = await daoSpecialty.findByName(
      "cardiologist"
    );
    const doctor = await api
      .post("/api/v1/doctor")
      .send({ ...DoctorMock[0], id_specialty: specialty.id })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    const response = await api
      .post(`/api/v1/doctor/${doctor.body.data}/schedule`)
      .send({ day: "sunday", hourIn: "08:00:00", hourOut: "15:00:00" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    expect(response.body.msg).toEqual("DAY_NOT_FOUND");
  });

  test("doctor not found", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });

    const response = await api
      .post(`/api/v1/doctor/${uuid()}/schedule`)
      .send({ day: "monday", hourIn: "08:00:00", hourOut: "15:00:00" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    expect(response.body.msg).toEqual("DOCTOR_NOT_FOUND");
  });
});

describe("update schedule", () => {
  test("updated successfully", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });

    const specialty: specialtiesOIF = await daoSpecialty.findByName(
      "cardiologist"
    );
    const doctor = await api
      .post("/api/v1/doctor")
      .send({ ...DoctorMock[0], id_specialty: specialty.id })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    await api
      .post(`/api/v1/doctor/${doctor.body.data}/schedule`)
      .send({ day: "friday", hourIn: "08:00:00", hourOut: "15:00:00" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    //update:
    const response = await api
      .put(`/api/v1/doctor/${doctor.body.data}/schedule`)
      .send({ day: "friday", hourIn: "10:00:00", hourOut: "15:00:00" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    expect(response.body.msg).toEqual("SCHEDULE_UPDATED");
  });

  test("schedule not found", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });

    const specialty: specialtiesOIF = await daoSpecialty.findByName(
      "cardiologist"
    );
    const doctor = await api
      .post("/api/v1/doctor")
      .send({ ...DoctorMock[0], id_specialty: specialty.id })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    await api
      .post(`/api/v1/doctor/${doctor.body.data}/schedule`)
      .send({ day: "friday", hourIn: "08:00:00", hourOut: "15:00:00" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    //update:
    const response = await api
      .put(`/api/v1/doctor/${doctor.body.data}/schedule`)
      .send({ day: "monday", hourIn: "10:00:00", hourOut: "15:00:00" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    expect(response.body.msg).toEqual("SCHEDULE_NOT_FOUND");
  });

  test("day not found", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });

    const specialty: specialtiesOIF = await daoSpecialty.findByName(
      "cardiologist"
    );
    const doctor = await api
      .post("/api/v1/doctor")
      .send({ ...DoctorMock[0], id_specialty: specialty.id })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    await api
      .post(`/api/v1/doctor/${doctor.body.data}/schedule`)
      .send({ day: "friday", hourIn: "08:00:00", hourOut: "15:00:00" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    //update:
    const response = await api
      .put(`/api/v1/doctor/${doctor.body.data}/schedule`)
      .send({ day: "sunday", hourIn: "10:00:00", hourOut: "15:00:00" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    expect(response.body.msg).toEqual("DAY_NOT_FOUND");
  });

  test("doctor not found", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });
    //update:
    const response = await api
      .put(`/api/v1/doctor/${uuid()}/schedule`)
      .send({ day: "monday", hourIn: "10:00:00", hourOut: "15:00:00" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    expect(response.body.msg).toEqual("DOCTOR_NOT_FOUND");
  });
});

describe("delete schedule", () => {
  test("deleted successfully", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });

    const specialty: specialtiesOIF = await daoSpecialty.findByName(
      "cardiologist"
    );
    const doctor = await api
      .post("/api/v1/doctor")
      .send({ ...DoctorMock[0], id_specialty: specialty.id })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    await api
      .post(`/api/v1/doctor/${doctor.body.data}/schedule`)
      .send({ day: "friday", hourIn: "08:00:00", hourOut: "15:00:00" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    //delete:
    const response = await api
      .delete(`/api/v1/doctor/${doctor.body.data}/schedule/friday`)
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("SCHEDULE_DELETED");
  });

  test("schedule not found", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });

    const specialty: specialtiesOIF = await daoSpecialty.findByName(
      "cardiologist"
    );
    const doctor = await api
      .post("/api/v1/doctor")
      .send({ ...DoctorMock[0], id_specialty: specialty.id })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    await api
      .post(`/api/v1/doctor/${doctor.body.data}/schedule`)
      .send({ day: "friday", hourIn: "08:00:00", hourOut: "15:00:00" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    //delete:
    const response = await api
      .delete(`/api/v1/doctor/${doctor.body.data}/schedule/monday`)
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("SCHEDULE_NOT_FOUND");
  });

  test("day not found", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });

    const specialty: specialtiesOIF = await daoSpecialty.findByName(
      "cardiologist"
    );
    const doctor = await api
      .post("/api/v1/doctor")
      .send({ ...DoctorMock[0], id_specialty: specialty.id })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    await api
      .post(`/api/v1/doctor/${doctor.body.data}/schedule`)
      .send({ day: "friday", hourIn: "08:00:00", hourOut: "15:00:00" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    //delete:
    const response = await api
      .delete(`/api/v1/doctor/${doctor.body.data}/schedule/sunday`)
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("DAY_NOT_FOUND");
  });

  test("doctor not found", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });
    //delete:
    const response = await api
      .delete(`/api/v1/doctor/${uuid()}/schedule/sunday`)
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("DOCTOR_NOT_FOUND");
  });

  test("invalid_id", async () => {
    const login = await api
      .post("/api/v1/staff/login")
      .send({ username: mockStaff.username, password: mockStaff.password });
    //delete:
    const response = await api
      .delete(`/api/v1/doctor/${uuid()}/schedule/sunday`)
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("DOCTOR_NOT_FOUND");
  });
});
