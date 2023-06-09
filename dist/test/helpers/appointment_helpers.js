"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientMock = exports.specialtyMock = exports.doctorMock = exports.staffMock = exports.api = exports.daoDay = exports.daoSpecialty = exports.daoPatient = exports.daoDoctor = exports.daoAppointment = exports.daoStaff = void 0;
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../src/index");
const staff_dao_1 = __importDefault(require("../../src/modules/staff/staff.dao"));
const appointment_dao_1 = __importDefault(require("../../src/modules/appointment/appointment.dao"));
const doctor_dao_1 = __importDefault(require("../../src/modules/doctor/daos/doctor.dao"));
const patient_dao_1 = __importDefault(require("../../src/modules/patient/patient.dao"));
const specialty_dao_1 = __importDefault(require("../../src/modules/doctor/daos/specialty.dao"));
const day_dao_1 = __importDefault(require("../../src/modules/doctor/daos/day.dao"));
//DAOS:
exports.daoStaff = new staff_dao_1.default();
exports.daoAppointment = new appointment_dao_1.default();
exports.daoDoctor = new doctor_dao_1.default();
exports.daoPatient = new patient_dao_1.default();
exports.daoSpecialty = new specialty_dao_1.default();
exports.daoDay = new day_dao_1.default();
//API:
exports.api = (0, supertest_1.default)(index_1.app);
// MOCKS:
exports.staffMock = [
    {
        name: "john",
        lastname: "doe",
        mail: "johndoe@gmail.com",
        cellphone: "15567879",
        dni: "45908765",
        birthday: "1990/6/16",
        username: "john1990",
        password: "147258",
        status: "active",
        seniority: "2017/5/15",
        salary: 3000.2,
    },
];
exports.doctorMock = [
    {
        name: "jack",
        lastname: "sparrow",
        mail: "jack@gmail.com",
        cellphone: "155678987",
        dni: "56876564",
        birthday: "1980/12/1",
        id_specialty: "",
    },
];
exports.specialtyMock = [{ name: "cardiologist" }];
exports.patientMock = [
    {
        name: "jack",
        lastname: "sparrow",
        mail: "jack@gmail.com",
        cellphone: "155678987",
        dni: "56876564",
        birthday: "1980/12/1",
        social_number: "111144447777",
    },
];
