import { server } from "../src";
import { v4 as uuid } from "uuid";
import {
  api,
  daoDoctor,
  daoPatient,
  daoStaff,
  daoDay,
  staffMock,
  patientMock,
  daoSpecialty,
  doctorMock,
  specialtyMock,
} from "./helpers/appointment_helpers";
import { dayOIF } from "../src/interfaces/doctor/day.interface";

beforeEach(async () => {
  await daoDoctor.deleteAll();
  await daoPatient.deleteAll();
  await daoStaff.deleteAll();
  await daoSpecialty.deleteAll();
});

afterAll(async () => {
  await server.close();
});

describe("create appointment", () => {
  test("created successfully", async () => {
    //create staff:
    const staff = await api.post("/api/v1/staff/register/").send(staffMock[0]);

    //Login staff:
    const login = await api.post("/api/v1/staff/login").send({
      username: staffMock[0].username,
      password: staffMock[0].password,
    });

    //create patient:
    const patient = await api
      .post("/api/v1/patient/")
      .send(patientMock[0])
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    //create specialty:
    const specialty = await api
      .post("/api/v1/specialty/")
      .send(specialtyMock[0])
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    //create: doctor:
    const doctor = await api
      .post("/api/v1/doctor/")
      .send({ ...doctorMock[0], id_specialty: specialty.body.data })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    //create Specialty:
    await api
      .post(`/api/v1/doctor/${doctor.body.data}/schedule`)
      .send({ day: "friday", hourIn: "08:00:00", hourOut: "15:00:00" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    const day: dayOIF = await daoDay.findByName("friday");
    //APPOINTMENT:
    const response = await api
      .post("/api/v1/appointment/")
      .send({
        date: "2023/05/05",
        id_doctor: doctor.body.data,
        id_staff: staff.body.data,
        id_patient: patient.body.data,
        id_day: day.id,
      })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    expect(response.body.msg).toEqual("APPOINTMENT_CREATED");
  });

  test("patient doesn't exists", async () => {
    //create staff:
    const staff = await api.post("/api/v1/staff/register/").send(staffMock[0]);

    //Login staff:
    const login = await api.post("/api/v1/staff/login").send({
      username: staffMock[0].username,
      password: staffMock[0].password,
    });

    //create specialty:
    const specialty = await api
      .post("/api/v1/specialty/")
      .send(specialtyMock[0])
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    //create: doctor:
    const doctor = await api
      .post("/api/v1/doctor/")
      .send({ ...doctorMock[0], id_specialty: specialty.body.data })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    //create Specialty:
    await api
      .post(`/api/v1/doctor/${doctor.body.data}/schedule`)
      .send({ day: "friday", hourIn: "08:00:00", hourOut: "15:00:00" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    const day: dayOIF = await daoDay.findByName("friday");
    //APPOINTMENT:
    const response = await api
      .post("/api/v1/appointment/")
      .send({
        date: "2023/05/05",
        id_doctor: doctor.body.data,
        id_staff: staff.body.data,
        id_patient: `${uuid()}`,
        id_day: day.id,
      })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    expect(response.body.msg).toEqual("PATIENT_NOT_FOUND");
  });

  test("doctor doesn't exists", async () => {
    //create staff:
    const staff = await api.post("/api/v1/staff/register/").send(staffMock[0]);

    //Login staff:
    const login = await api.post("/api/v1/staff/login").send({
      username: staffMock[0].username,
      password: staffMock[0].password,
    });

    //create patient:
    const patient = await api
      .post("/api/v1/patient/")
      .send(patientMock[0])
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    const day: dayOIF = await daoDay.findByName("friday");
    //APPOINTMENT:
    const response = await api
      .post("/api/v1/appointment/")
      .send({
        date: "2023/05/05",
        id_doctor: `${uuid()}`,
        id_staff: staff.body.data,
        id_patient: patient.body.data,
        id_day: day.id,
      })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    expect(response.body.msg).toEqual("DOCTOR_NOT_FOUND");
  });
});
