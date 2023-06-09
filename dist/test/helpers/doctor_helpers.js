"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorMock = exports.mockStaff = exports.SpecialtyMock = exports.api = exports.daoSpecialty = exports.daoStaff = exports.daoDoctor = void 0;
const supertest_1 = __importDefault(require("supertest"));
const specialty_dao_1 = __importDefault(require("../../src/modules/doctor/daos/specialty.dao"));
const index_1 = require("../../src/index");
const doctor_dao_1 = __importDefault(require("../../src/modules/doctor/daos/doctor.dao"));
const staff_dao_1 = __importDefault(require("../../src/modules/staff/staff.dao"));
exports.daoDoctor = new doctor_dao_1.default();
exports.daoStaff = new staff_dao_1.default();
exports.daoSpecialty = new specialty_dao_1.default();
exports.api = (0, supertest_1.default)(index_1.app);
exports.SpecialtyMock = [
    { name: "cardiologist" },
    { name: "traumatologist" },
    { name: "orthopedist" },
    { name: "gastroenterologist" },
    { name: "dermatologist" },
];
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
exports.DoctorMock = [
    {
        name: "jack",
        lastname: "sparrow",
        mail: "jack@gmail.com",
        cellphone: "155678987",
        dni: "56876564",
        birthday: "1980/12/1",
        id_specialty: "",
    },
    {
        name: "chris",
        lastname: "martins",
        mail: "martins@gmail.com",
        cellphone: "155678987",
        dni: "24857859",
        birthday: "1980/12/1",
        id_specialty: "",
    },
    {
        name: "indiana",
        lastname: "jones",
        mail: "jones@gmail.com",
        cellphone: "155678987",
        dni: "19874526",
        birthday: "1980/12/1",
        id_specialty: "",
    },
];
