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
const patient_helpers_1 = require("./helpers/patient_helpers");
const uuid_1 = require("uuid");
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield patient_helpers_1.daoPatient.deleteUsers();
    yield patient_helpers_1.daoStaff.deleteAll();
    yield patient_helpers_1.api.post("/api/v1/staff/register").send(patient_helpers_1.mockStaff);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    src_1.server.close();
}));
describe("create patient", () => {
    test("created successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield patient_helpers_1.api.post("/api/v1/staff/login/").send({
            username: patient_helpers_1.mockStaff.username,
            password: patient_helpers_1.mockStaff.password,
        });
        const response = yield patient_helpers_1.api
            .post("/api/v1/patient/")
            .send(patient_helpers_1.patientMock[0])
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("PATIENT_CREATED");
    }));
    test("patient already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield patient_helpers_1.api.post("/api/v1/staff/login/").send({
            username: patient_helpers_1.mockStaff.username,
            password: patient_helpers_1.mockStaff.password,
        });
        yield patient_helpers_1.api
            .post("/api/v1/patient/")
            .send(patient_helpers_1.patientMock[0])
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        const response = yield patient_helpers_1.api
            .post("/api/v1/patient/")
            .send(patient_helpers_1.patientMock[0])
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("PATIENT_ALREADY_EXISTS");
    }));
    test("social number in use", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield patient_helpers_1.api.post("/api/v1/staff/login/").send({
            username: patient_helpers_1.mockStaff.username,
            password: patient_helpers_1.mockStaff.password,
        });
        yield patient_helpers_1.api
            .post("/api/v1/patient/")
            .send(patient_helpers_1.patientMock[1])
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        const response = yield patient_helpers_1.api
            .post("/api/v1/patient/")
            .send(Object.assign(Object.assign({}, patient_helpers_1.patientMock[0]), { social_number: patient_helpers_1.patientMock[1].social_number }))
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("SOCIAL_NUMBER_IN_USE");
    }));
    test("mail in use", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield patient_helpers_1.api.post("/api/v1/staff/login/").send({
            username: patient_helpers_1.mockStaff.username,
            password: patient_helpers_1.mockStaff.password,
        });
        yield patient_helpers_1.api
            .post("/api/v1/patient/")
            .send(patient_helpers_1.patientMock[1])
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        const response = yield patient_helpers_1.api
            .post("/api/v1/patient/")
            .send(Object.assign(Object.assign({}, patient_helpers_1.patientMock[0]), { mail: patient_helpers_1.patientMock[1].mail }))
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("MAIL_IN_USE");
    }));
});
describe("find by dni", () => {
    test("patient found it", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield patient_helpers_1.api.post("/api/v1/staff/login/").send({
            username: patient_helpers_1.mockStaff.username,
            password: patient_helpers_1.mockStaff.password,
        });
        yield patient_helpers_1.api
            .post("/api/v1/patient/")
            .send(patient_helpers_1.patientMock[0])
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        const response = yield patient_helpers_1.api
            .get(`/api/v1/patient/${patient_helpers_1.patientMock[0].dni}`)
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("OK");
    }));
    test("invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield patient_helpers_1.api.post("/api/v1/staff/login/").send({
            username: patient_helpers_1.mockStaff.username,
            password: patient_helpers_1.mockStaff.password,
        });
        const response = yield patient_helpers_1.api
            .get(`/api/v1/patient/ssd11`)
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("INVALID_DNI");
    }));
    test("patient not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield patient_helpers_1.api.post("/api/v1/staff/login/").send({
            username: patient_helpers_1.mockStaff.username,
            password: patient_helpers_1.mockStaff.password,
        });
        const response = yield patient_helpers_1.api
            .get(`/api/v1/patient/25668885`)
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("PATIENT_NOT_FOUND");
    }));
});
describe("update personal data", () => {
    test("updated", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield patient_helpers_1.api.post("/api/v1/staff/login/").send({
            username: patient_helpers_1.mockStaff.username,
            password: patient_helpers_1.mockStaff.password,
        });
        const patient = yield patient_helpers_1.api
            .post("/api/v1/patient/")
            .send(patient_helpers_1.patientMock[0])
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        const response = yield patient_helpers_1.api
            .put(`/api/v1/patient/${patient.body.data}/personal`)
            .send({
            name: "juan",
            lastname: "perdri",
            cellphone: "147852635",
            birthday: "1987/5/4",
        })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("PATIENT_UPDATED");
    }));
    test("not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield patient_helpers_1.api.post("/api/v1/staff/login/").send({
            username: patient_helpers_1.mockStaff.username,
            password: patient_helpers_1.mockStaff.password,
        });
        const response = yield patient_helpers_1.api
            .put(`/api/v1/patient/${(0, uuid_1.v4)()}/personal`)
            .send({
            name: "juan",
            lastname: "perdri",
            cellphone: "147852635",
            birthday: "1987/5/4",
        })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("PATIENT_NOT_FOUND");
    }));
});
describe("update social number", () => {
    test("updated", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield patient_helpers_1.api.post("/api/v1/staff/login/").send({
            username: patient_helpers_1.mockStaff.username,
            password: patient_helpers_1.mockStaff.password,
        });
        const patient = yield patient_helpers_1.api
            .post("/api/v1/patient/")
            .send(patient_helpers_1.patientMock[0])
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        const response = yield patient_helpers_1.api
            .put(`/api/v1/patient/${patient.body.data}/socialnumber`)
            .send({
            social_number: "14785296325",
        })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("PATIENT_UPDATED");
    }));
    test("invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield patient_helpers_1.api.post("/api/v1/staff/login/").send({
            username: patient_helpers_1.mockStaff.username,
            password: patient_helpers_1.mockStaff.password,
        });
        const response = yield patient_helpers_1.api
            .put(`/api/v1/patient/asdasdad1q/socialnumber`)
            .send({
            social_number: "14785296325",
        })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("INVALID_ID");
    }));
    test("patient not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield patient_helpers_1.api.post("/api/v1/staff/login/").send({
            username: patient_helpers_1.mockStaff.username,
            password: patient_helpers_1.mockStaff.password,
        });
        const response = yield patient_helpers_1.api
            .put(`/api/v1/patient/${(0, uuid_1.v4)()}/socialnumber`)
            .send({
            social_number: "14785296325",
        })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("PATIENT_NOT_FOUND");
    }));
});
describe("change mail", () => {
    test("mail updated", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield patient_helpers_1.api.post("/api/v1/staff/login/").send({
            username: patient_helpers_1.mockStaff.username,
            password: patient_helpers_1.mockStaff.password,
        });
        const patient = yield patient_helpers_1.api
            .post("/api/v1/patient/")
            .send(patient_helpers_1.patientMock[0])
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        const response = yield patient_helpers_1.api
            .put(`/api/v1/patient/${patient.body.data}/mail`)
            .send({
            mail: "franco@gmail.com",
        })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("PATIENT_UPDATED");
    }));
    test("mail is the same", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield patient_helpers_1.api.post("/api/v1/staff/login/").send({
            username: patient_helpers_1.mockStaff.username,
            password: patient_helpers_1.mockStaff.password,
        });
        const patient = yield patient_helpers_1.api
            .post("/api/v1/patient/")
            .send(patient_helpers_1.patientMock[0])
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        const response = yield patient_helpers_1.api
            .put(`/api/v1/patient/${patient.body.data}/mail`)
            .send({
            mail: patient_helpers_1.patientMock[0].mail,
        })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("MAIL_IS_THE_SAME");
    }));
    test("mail in use", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield patient_helpers_1.api.post("/api/v1/staff/login/").send({
            username: patient_helpers_1.mockStaff.username,
            password: patient_helpers_1.mockStaff.password,
        });
        const patient = yield patient_helpers_1.api
            .post("/api/v1/patient/")
            .send(patient_helpers_1.patientMock[0])
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        yield patient_helpers_1.api
            .post("/api/v1/patient/")
            .send(patient_helpers_1.patientMock[1])
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        const response = yield patient_helpers_1.api
            .put(`/api/v1/patient/${patient.body.data}/mail`)
            .send({
            mail: patient_helpers_1.patientMock[1].mail,
        })
            .set("Authorization", `Bearer ${login.body.data.jwt}`);
        expect(response.body.msg).toEqual("MAIL_IN_USE");
    }));
});
