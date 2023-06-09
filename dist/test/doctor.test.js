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
const doctor_helpers_1 = require("./helpers/doctor_helpers");
const uuid_1 = require("uuid");
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield doctor_helpers_1.daoDoctor.deleteUsers();
    yield doctor_helpers_1.daoSpecialty.deleteAll();
    yield doctor_helpers_1.daoDoctor.deleteAll();
    yield doctor_helpers_1.api.post("/api/v1/staff/register").send(doctor_helpers_1.mockStaff);
    const login = yield doctor_helpers_1.api
        .post("/api/v1/staff/login")
        .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
    //specialties:
    yield Promise.all(doctor_helpers_1.SpecialtyMock.map((s) => __awaiter(void 0, void 0, void 0, function* () {
        yield doctor_helpers_1.api
            .post("/api/v1/specialty")
            .send(s)
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
    })));
}));
afterAll(() => {
    src_1.server.close();
});
describe("create specialty", () => {
    test("created successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const response = yield doctor_helpers_1.api
            .post("/api/v1/specialty")
            .send({ name: "pediatrician" })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("SPECIALTY_CREATED");
    }));
    test("Already created", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        yield doctor_helpers_1.api
            .post("/api/v1/specialty")
            .send({ name: doctor_helpers_1.SpecialtyMock[0].name })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        const response = yield doctor_helpers_1.api
            .post("/api/v1/specialty")
            .send({ name: doctor_helpers_1.SpecialtyMock[0].name })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("SPECIALTY_ALREADY_CREATED");
    }));
    test("Name too short", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const response = yield doctor_helpers_1.api
            .post("/api/v1/specialty")
            .send({ name: "a" })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
    test("Name too long", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const response = yield doctor_helpers_1.api
            .post("/api/v1/specialty")
            .send({ name: "aasdadasdasdaqweoqwieqwoeiqadkasdkasjdkasjdaskdja" })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
    test("Name is not a string", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const response = yield doctor_helpers_1.api
            .post("/api/v1/specialty")
            .send({ name: 12 })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
});
describe("delete Specialty", () => {
    test("deleted successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const specialty = yield doctor_helpers_1.daoSpecialty.findByName(doctor_helpers_1.SpecialtyMock[0].name);
        const response = yield doctor_helpers_1.api
            .delete(`/api/v1/specialty/${specialty.id}`)
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("SPECIALTY_DELETED");
    }));
    test("invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const response = yield doctor_helpers_1.api
            .delete(`/api/v1/specialty/2313`)
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("INVALID_ID");
    }));
});
describe("Add doctor", () => {
    test("created successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const specialty = yield doctor_helpers_1.daoSpecialty.findByName("cardiologist");
        const response = yield doctor_helpers_1.api
            .post("/api/v1/doctor")
            .send(Object.assign(Object.assign({}, doctor_helpers_1.DoctorMock[0]), { id_specialty: specialty.id }))
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("DOCTOR_REGISTERED");
    }));
    test("invalid specialty id", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const response = yield doctor_helpers_1.api
            .post("/api/v1/doctor")
            .send(Object.assign(Object.assign({}, doctor_helpers_1.DoctorMock[0]), { id_specialty: "jadasjdakjdijeweirjweirjwer" }))
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("INVALID_ID");
    }));
    test("specialty not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const response = yield doctor_helpers_1.api
            .post("/api/v1/doctor")
            .send(Object.assign(Object.assign({}, doctor_helpers_1.DoctorMock[0]), { id_specialty: `${(0, uuid_1.v4)()}` }))
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("SPECIALTY_NOT_FOUND");
    }));
    test("already registered", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const specialty = yield doctor_helpers_1.daoSpecialty.findByName("cardiologist");
        yield doctor_helpers_1.api
            .post("/api/v1/doctor")
            .send(Object.assign(Object.assign({}, doctor_helpers_1.DoctorMock[0]), { id_specialty: specialty.id }))
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        const response = yield doctor_helpers_1.api
            .post("/api/v1/doctor")
            .send(Object.assign(Object.assign({}, doctor_helpers_1.DoctorMock[0]), { id_specialty: specialty.id }))
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("DOCTOR_ALREADY_REGISTERED");
    }));
});
describe("update data", () => {
    test("update successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const specialty = yield doctor_helpers_1.daoSpecialty.findByName("cardiologist");
        const doctor = yield doctor_helpers_1.api
            .post("/api/v1/doctor")
            .send(Object.assign(Object.assign({}, doctor_helpers_1.DoctorMock[0]), { id_specialty: specialty.id }))
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        const response = yield doctor_helpers_1.api
            .put(`/api/v1/doctor/${doctor.body.data}/data`)
            .send({
            name: "horacio",
            lastname: "gonzales",
            cellphone: "147856895",
            birthday: "1987/10/25",
        })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("DOCTOR_UPDATED");
    }));
    test("doctor not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const response = yield doctor_helpers_1.api
            .put(`/api/v1/doctor/${(0, uuid_1.v4)()}/data`)
            .send({
            name: "horacio",
            lastname: "gonzales",
            cellphone: "147856895",
            birthday: "1987/10/25",
        })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("DOCTOR_NOT_FOUND");
    }));
    test("invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const response = yield doctor_helpers_1.api
            .put(`/api/v1/doctor/jjsdfsdjfsie/data`)
            .send({
            name: "horacio",
            lastname: "gonzales",
            cellphone: "147856895",
            birthday: "1987/10/25",
        })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("INVALID_ID");
    }));
});
describe("update mail", () => {
    test("mail updated successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const specialty = yield doctor_helpers_1.daoSpecialty.findByName("cardiologist");
        const doctor = yield doctor_helpers_1.api
            .post("/api/v1/doctor")
            .send(Object.assign(Object.assign({}, doctor_helpers_1.DoctorMock[0]), { id_specialty: specialty.id }))
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        const response = yield doctor_helpers_1.api
            .put(`/api/v1/doctor/${doctor.body.data}/mail`)
            .send({
            mail: "murcia@gmail.com",
        })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("DOCTOR_UPDATED");
    }));
    test("mail is the same", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const specialty = yield doctor_helpers_1.daoSpecialty.findByName("cardiologist");
        const doctor = yield doctor_helpers_1.api
            .post("/api/v1/doctor")
            .send(Object.assign(Object.assign({}, doctor_helpers_1.DoctorMock[0]), { id_specialty: specialty.id }))
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        const response = yield doctor_helpers_1.api
            .put(`/api/v1/doctor/${doctor.body.data}/mail`)
            .send({
            mail: doctor_helpers_1.DoctorMock[0].mail,
        })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("MAIL_IS_THE_SAME");
    }));
    test("mail in use", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const specialty = yield doctor_helpers_1.daoSpecialty.findByName("cardiologist");
        const doctor = yield doctor_helpers_1.api
            .post("/api/v1/doctor")
            .send(Object.assign(Object.assign({}, doctor_helpers_1.DoctorMock[0]), { id_specialty: specialty.id }))
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        yield doctor_helpers_1.api
            .post("/api/v1/doctor")
            .send(Object.assign(Object.assign({}, doctor_helpers_1.DoctorMock[1]), { id_specialty: specialty.id }))
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        const response = yield doctor_helpers_1.api
            .put(`/api/v1/doctor/${doctor.body.data}/mail`)
            .send({
            mail: doctor_helpers_1.DoctorMock[1].mail,
        })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("MAIL_IN_USE");
    }));
});
describe("update specialty", () => {
    test("specialty updated", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const specialty = yield doctor_helpers_1.daoSpecialty.findByName("cardiologist");
        const newSpecialty = yield doctor_helpers_1.daoSpecialty.findByName("traumatologist");
        const doctor = yield doctor_helpers_1.api
            .post("/api/v1/doctor")
            .send(Object.assign(Object.assign({}, doctor_helpers_1.DoctorMock[0]), { id_specialty: specialty.id }))
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        const response = yield doctor_helpers_1.api
            .put(`/api/v1/doctor/${doctor.body.data}/specialty`)
            .send({
            id_specialty: newSpecialty.id,
        })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("DOCTOR_UPDATED");
    }));
    test("specialty not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const specialty = yield doctor_helpers_1.daoSpecialty.findByName("cardiologist");
        const doctor = yield doctor_helpers_1.api
            .post("/api/v1/doctor")
            .send(Object.assign(Object.assign({}, doctor_helpers_1.DoctorMock[0]), { id_specialty: specialty.id }))
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        const response = yield doctor_helpers_1.api
            .put(`/api/v1/doctor/${doctor.body.data}/specialty`)
            .send({
            id_specialty: `${(0, uuid_1.v4)()}`,
        })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("SPECIALTY_NOT_FOUND");
    }));
});
describe("add schedule", () => {
    test("created successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const specialty = yield doctor_helpers_1.daoSpecialty.findByName("cardiologist");
        const doctor = yield doctor_helpers_1.api
            .post("/api/v1/doctor")
            .send(Object.assign(Object.assign({}, doctor_helpers_1.DoctorMock[0]), { id_specialty: specialty.id }))
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        const response = yield doctor_helpers_1.api
            .post(`/api/v1/doctor/${doctor.body.data}/schedule`)
            .send({ day: "friday", hourIn: "08:00:00", hourOut: "15:00:00" })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("SCHEDULE_ADDED");
    }));
    test("Invalid day", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const specialty = yield doctor_helpers_1.daoSpecialty.findByName("cardiologist");
        const doctor = yield doctor_helpers_1.api
            .post("/api/v1/doctor")
            .send(Object.assign(Object.assign({}, doctor_helpers_1.DoctorMock[0]), { id_specialty: specialty.id }))
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        const response = yield doctor_helpers_1.api
            .post(`/api/v1/doctor/${doctor.body.data}/schedule`)
            .send({ day: "sunday", hourIn: "08:00:00", hourOut: "15:00:00" })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("DAY_NOT_FOUND");
    }));
    test("doctor not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const response = yield doctor_helpers_1.api
            .post(`/api/v1/doctor/${(0, uuid_1.v4)()}/schedule`)
            .send({ day: "monday", hourIn: "08:00:00", hourOut: "15:00:00" })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("DOCTOR_NOT_FOUND");
    }));
});
describe("update schedule", () => {
    test("updated successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const specialty = yield doctor_helpers_1.daoSpecialty.findByName("cardiologist");
        const doctor = yield doctor_helpers_1.api
            .post("/api/v1/doctor")
            .send(Object.assign(Object.assign({}, doctor_helpers_1.DoctorMock[0]), { id_specialty: specialty.id }))
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        yield doctor_helpers_1.api
            .post(`/api/v1/doctor/${doctor.body.data}/schedule`)
            .send({ day: "friday", hourIn: "08:00:00", hourOut: "15:00:00" })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        //update:
        const response = yield doctor_helpers_1.api
            .put(`/api/v1/doctor/${doctor.body.data}/schedule`)
            .send({ day: "friday", hourIn: "10:00:00", hourOut: "15:00:00" })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("SCHEDULE_UPDATED");
    }));
    test("schedule not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const specialty = yield doctor_helpers_1.daoSpecialty.findByName("cardiologist");
        const doctor = yield doctor_helpers_1.api
            .post("/api/v1/doctor")
            .send(Object.assign(Object.assign({}, doctor_helpers_1.DoctorMock[0]), { id_specialty: specialty.id }))
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        yield doctor_helpers_1.api
            .post(`/api/v1/doctor/${doctor.body.data}/schedule`)
            .send({ day: "friday", hourIn: "08:00:00", hourOut: "15:00:00" })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        //update:
        const response = yield doctor_helpers_1.api
            .put(`/api/v1/doctor/${doctor.body.data}/schedule`)
            .send({ day: "monday", hourIn: "10:00:00", hourOut: "15:00:00" })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("SCHEDULE_NOT_FOUND");
    }));
    test("day not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const specialty = yield doctor_helpers_1.daoSpecialty.findByName("cardiologist");
        const doctor = yield doctor_helpers_1.api
            .post("/api/v1/doctor")
            .send(Object.assign(Object.assign({}, doctor_helpers_1.DoctorMock[0]), { id_specialty: specialty.id }))
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        yield doctor_helpers_1.api
            .post(`/api/v1/doctor/${doctor.body.data}/schedule`)
            .send({ day: "friday", hourIn: "08:00:00", hourOut: "15:00:00" })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        //update:
        const response = yield doctor_helpers_1.api
            .put(`/api/v1/doctor/${doctor.body.data}/schedule`)
            .send({ day: "sunday", hourIn: "10:00:00", hourOut: "15:00:00" })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("DAY_NOT_FOUND");
    }));
    test("doctor not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        //update:
        const response = yield doctor_helpers_1.api
            .put(`/api/v1/doctor/${(0, uuid_1.v4)()}/schedule`)
            .send({ day: "monday", hourIn: "10:00:00", hourOut: "15:00:00" })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("DOCTOR_NOT_FOUND");
    }));
});
describe("delete schedule", () => {
    test("deleted successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const specialty = yield doctor_helpers_1.daoSpecialty.findByName("cardiologist");
        const doctor = yield doctor_helpers_1.api
            .post("/api/v1/doctor")
            .send(Object.assign(Object.assign({}, doctor_helpers_1.DoctorMock[0]), { id_specialty: specialty.id }))
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        yield doctor_helpers_1.api
            .post(`/api/v1/doctor/${doctor.body.data}/schedule`)
            .send({ day: "friday", hourIn: "08:00:00", hourOut: "15:00:00" })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        //delete:
        const response = yield doctor_helpers_1.api
            .delete(`/api/v1/doctor/${doctor.body.data}/schedule/friday`)
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("SCHEDULE_DELETED");
    }));
    test("schedule not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const specialty = yield doctor_helpers_1.daoSpecialty.findByName("cardiologist");
        const doctor = yield doctor_helpers_1.api
            .post("/api/v1/doctor")
            .send(Object.assign(Object.assign({}, doctor_helpers_1.DoctorMock[0]), { id_specialty: specialty.id }))
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        yield doctor_helpers_1.api
            .post(`/api/v1/doctor/${doctor.body.data}/schedule`)
            .send({ day: "friday", hourIn: "08:00:00", hourOut: "15:00:00" })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        //delete:
        const response = yield doctor_helpers_1.api
            .delete(`/api/v1/doctor/${doctor.body.data}/schedule/monday`)
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("SCHEDULE_NOT_FOUND");
    }));
    test("day not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        const specialty = yield doctor_helpers_1.daoSpecialty.findByName("cardiologist");
        const doctor = yield doctor_helpers_1.api
            .post("/api/v1/doctor")
            .send(Object.assign(Object.assign({}, doctor_helpers_1.DoctorMock[0]), { id_specialty: specialty.id }))
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        yield doctor_helpers_1.api
            .post(`/api/v1/doctor/${doctor.body.data}/schedule`)
            .send({ day: "friday", hourIn: "08:00:00", hourOut: "15:00:00" })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        //delete:
        const response = yield doctor_helpers_1.api
            .delete(`/api/v1/doctor/${doctor.body.data}/schedule/sunday`)
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("DAY_NOT_FOUND");
    }));
    test("doctor not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        //delete:
        const response = yield doctor_helpers_1.api
            .delete(`/api/v1/doctor/${(0, uuid_1.v4)()}/schedule/sunday`)
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("DOCTOR_NOT_FOUND");
    }));
    test("invalid_id", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield doctor_helpers_1.api
            .post("/api/v1/staff/login")
            .send({ username: doctor_helpers_1.mockStaff.username, password: doctor_helpers_1.mockStaff.password });
        //delete:
        const response = yield doctor_helpers_1.api
            .delete(`/api/v1/doctor/${(0, uuid_1.v4)()}/schedule/sunday`)
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("DOCTOR_NOT_FOUND");
    }));
});
