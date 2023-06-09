"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const uuid_1 = require("uuid");
const appointment_helpers_1 = require("./helpers/appointment_helpers");
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield appointment_helpers_1.daoDoctor.deleteAll();
    yield appointment_helpers_1.daoPatient.deleteAll();
    yield appointment_helpers_1.daoStaff.deleteAll();
    yield appointment_helpers_1.daoSpecialty.deleteAll();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield src_1.server.close();
}));
describe("create appointment", () => {
    test("created successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        //create staff:
        const staff = yield appointment_helpers_1.api.post("/api/v1/staff/register/").send(appointment_helpers_1.staffMock[0]);
        //Login staff:
        const login = yield appointment_helpers_1.api.post("/api/v1/staff/login").send({
            username: appointment_helpers_1.staffMock[0].username,
            password: appointment_helpers_1.staffMock[0].password,
        });
        //create patient:
        const patient = yield appointment_helpers_1.api
            .post("/api/v1/patient/")
            .send(appointment_helpers_1.patientMock[0])
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        //create specialty:
        const specialty = yield appointment_helpers_1.api
            .post("/api/v1/specialty/")
            .send(appointment_helpers_1.specialtyMock[0])
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        //create: doctor:
        const doctor = yield appointment_helpers_1.api
            .post("/api/v1/doctor/")
            .send(Object.assign(Object.assign({}, appointment_helpers_1.doctorMock[0]), { id_specialty: specialty.body.data }))
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        //create Specialty:
        yield appointment_helpers_1.api
            .post(`/api/v1/doctor/${doctor.body.data}/schedule`)
            .send({ day: "friday", hourIn: "08:00:00", hourOut: "15:00:00" })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        const day = yield appointment_helpers_1.daoDay.findByName("friday");
        //APPOINTMENT:
        const response = yield appointment_helpers_1.api
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
    }));
    test("patient doesn't exists", () => __awaiter(void 0, void 0, void 0, function* () {
        //create staff:
        const staff = yield appointment_helpers_1.api.post("/api/v1/staff/register/").send(appointment_helpers_1.staffMock[0]);
        //Login staff:
        const login = yield appointment_helpers_1.api.post("/api/v1/staff/login").send({
            username: appointment_helpers_1.staffMock[0].username,
            password: appointment_helpers_1.staffMock[0].password,
        });
        //create specialty:
        const specialty = yield appointment_helpers_1.api
            .post("/api/v1/specialty/")
            .send(appointment_helpers_1.specialtyMock[0])
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        //create: doctor:
        const doctor = yield appointment_helpers_1.api
            .post("/api/v1/doctor/")
            .send(Object.assign(Object.assign({}, appointment_helpers_1.doctorMock[0]), { id_specialty: specialty.body.data }))
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        //create Specialty:
        yield appointment_helpers_1.api
            .post(`/api/v1/doctor/${doctor.body.data}/schedule`)
            .send({ day: "friday", hourIn: "08:00:00", hourOut: "15:00:00" })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        const day = yield appointment_helpers_1.daoDay.findByName("friday");
        //APPOINTMENT:
        const response = yield appointment_helpers_1.api
            .post("/api/v1/appointment/")
            .send({
            date: "2023/05/05",
            id_doctor: doctor.body.data,
            id_staff: staff.body.data,
            id_patient: `${(0, uuid_1.v4)()}`,
            id_day: day.id,
        })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("PATIENT_NOT_FOUND");
    }));
    test("doctor doesn't exists", () => __awaiter(void 0, void 0, void 0, function* () {
        //create staff:
        const staff = yield appointment_helpers_1.api.post("/api/v1/staff/register/").send(appointment_helpers_1.staffMock[0]);
        //Login staff:
        const login = yield appointment_helpers_1.api.post("/api/v1/staff/login").send({
            username: appointment_helpers_1.staffMock[0].username,
            password: appointment_helpers_1.staffMock[0].password,
        });
        //create patient:
        const patient = yield appointment_helpers_1.api
            .post("/api/v1/patient/")
            .send(appointment_helpers_1.patientMock[0])
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        const day = yield appointment_helpers_1.daoDay.findByName("friday");
        //APPOINTMENT:
        const response = yield appointment_helpers_1.api
            .post("/api/v1/appointment/")
            .send({
            date: "2023/05/05",
            id_doctor: `${(0, uuid_1.v4)()}`,
            id_staff: staff.body.data,
            id_patient: patient.body.data,
            id_day: day.id,
        })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("DOCTOR_NOT_FOUND");
    }));
});
