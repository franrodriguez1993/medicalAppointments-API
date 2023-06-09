"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientMock = exports.mockStaff = exports.daoStaff = exports.daoPatient = exports.api = void 0;
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../src/index");
const patient_dao_1 = __importDefault(require("../../src/modules/patient/patient.dao"));
const staff_dao_1 = __importDefault(require("../../src/modules/staff/staff.dao"));
exports.api = (0, supertest_1.default)(index_1.app);
exports.daoPatient = new patient_dao_1.default();
exports.daoStaff = new staff_dao_1.default();
exports.mockStaff = {
    name: "jane",
    lastname: "doe",
    mail: "janedoe@gmail.com",
    cellphone: "15541879",
    dni: "40908700",
    birthday: "1993/1/20",
    username: "jane1993",
    password: "147258",
    status: "active",
    seniority: "2020/5/20",
    salary: 2500.2,
};
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
    {
        name: "john",
        lastname: "connor",
        mail: "johnconnor@gmail.com",
        cellphone: "155674477",
        dni: "37785444",
        birthday: "1999/12/1",
        social_number: "000044447777",
    },
];
