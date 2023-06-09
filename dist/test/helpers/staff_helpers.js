"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newStaffMock = exports.staffListMock = exports.daoStaff = exports.api = void 0;
const supertest_1 = __importDefault(require("supertest"));
const staff_dao_1 = __importDefault(require("../../src/modules/staff/staff.dao"));
const uuid_1 = require("uuid");
const index_1 = require("../../src/index");
exports.api = (0, supertest_1.default)(index_1.app);
exports.daoStaff = new staff_dao_1.default();
exports.staffListMock = [
    {
        id: `${(0, uuid_1.v4)()}`,
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
    {
        id: `${(0, uuid_1.v4)()}`,
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
    },
];
exports.newStaffMock = {
    name: "giancarlo",
    lastname: "lucciani",
    mail: "gian@gmail.com",
    cellphone: "15540079",
    dni: "30908700",
    birthday: "1999/1/20",
    username: "gian1993",
    password: "147258",
    status: "active",
    seniority: "2021/5/20",
    salary: 2200.2,
};
