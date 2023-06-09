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
const staff_helpers_1 = require("./helpers/staff_helpers");
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield staff_helpers_1.daoStaff.deleteUsers();
    yield staff_helpers_1.daoStaff.deleteAll();
    yield Promise.all(staff_helpers_1.staffListMock.map((s) => __awaiter(void 0, void 0, void 0, function* () {
        yield staff_helpers_1.api.post("/api/v1/staff/register").send(s);
    })));
}));
afterAll(() => {
    src_1.server.close();
});
describe("Register test", () => {
    test("register successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api
            .post("/api/v1/staff/register")
            .send(staff_helpers_1.newStaffMock);
        expect(response.body.msg).toEqual("STAFF_REGISTERED");
    }));
    test("mail in use", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api
            .post("/api/v1/staff/register")
            .send(Object.assign(Object.assign({}, staff_helpers_1.newStaffMock), { mail: staff_helpers_1.staffListMock[0].mail }));
        expect(response.body.msg).toEqual("MAIL_IN_USE");
    }));
    test("username in use", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api
            .post("/api/v1/staff/register")
            .send(Object.assign(Object.assign({}, staff_helpers_1.newStaffMock), { username: staff_helpers_1.staffListMock[0].username }));
        expect(response.body.msg).toEqual("USERNAME_IN_USE");
    }));
    test("dni in use", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api
            .post("/api/v1/staff/register")
            .send(Object.assign(Object.assign({}, staff_helpers_1.newStaffMock), { dni: staff_helpers_1.staffListMock[0].dni }));
        expect(response.body.msg).toEqual("DNI_IN_USE");
    }));
    test("invalid username - too short", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api
            .post("/api/v1/staff/register")
            .send(Object.assign(Object.assign({}, staff_helpers_1.newStaffMock), { username: "hu" }));
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
    test("invalid username - too long", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api.post("/api/v1/staff/register").send(Object.assign(Object.assign({}, staff_helpers_1.newStaffMock), { username: "hukasdjaskdjasdjqwoeiqwoeiqoewiqwoeiqeoqiweoqieqoweijdsfsdfawsqw" }));
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
    test("invalid email", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api
            .post("/api/v1/staff/register")
            .send(Object.assign(Object.assign({}, staff_helpers_1.newStaffMock), { mail: "juancarlos" }));
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
    test("invalid password - too short", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api
            .post("/api/v1/staff/register")
            .send(Object.assign(Object.assign({}, staff_helpers_1.newStaffMock), { password: "juan" }));
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
    test("invalid password - too long", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api.post("/api/v1/staff/register").send(Object.assign(Object.assign({}, staff_helpers_1.newStaffMock), { password: "juandfsdfsdfsdfsdfowerwieroiwerowiroweirweoriweoriaaqq" }));
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
    test("invalid salary - too high", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api.post("/api/v1/staff/register").send(Object.assign(Object.assign({}, staff_helpers_1.newStaffMock), { salary: 250000000.0 }));
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
    test("invalid salary - too low", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api.post("/api/v1/staff/register").send(Object.assign(Object.assign({}, staff_helpers_1.newStaffMock), { salary: 100.0 }));
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
    test("invalid salary - has to be a float", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api.post("/api/v1/staff/register").send(Object.assign(Object.assign({}, staff_helpers_1.newStaffMock), { salary: "juan" }));
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
});
describe("Login test", () => {
    test("Login successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api.post("/api/v1/staff/login").send({
            username: staff_helpers_1.staffListMock[0].username,
            password: staff_helpers_1.staffListMock[0].password,
        });
        expect(response.body.msg).toEqual("LOGIN_SUCCESSFULLY");
    }));
    test("Invalid credentials - username", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api.post("/api/v1/staff/login").send({
            username: "juancarlos",
            password: staff_helpers_1.staffListMock[0].password,
        });
        expect(response.body.msg).toEqual("INVALID_CREDENTIALS");
    }));
    test("Invalid credentials - password", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api.post("/api/v1/staff/login").send({
            username: staff_helpers_1.staffListMock[0].username,
            password: "juancarlos",
        });
        expect(response.body.msg).toEqual("INVALID_CREDENTIALS");
    }));
    test("Invalid password", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api.post("/api/v1/staff/login").send({
            username: staff_helpers_1.staffListMock[0].username,
            password: "aa",
        });
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
    test("Invalid username", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api.post("/api/v1/staff/login").send({
            username: "ae",
            password: "juancarlos",
        });
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
});
describe("update personal data test", () => {
    test("updated successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield staff_helpers_1.daoStaff.findByUsername(staff_helpers_1.staffListMock[0].username);
        const response = yield staff_helpers_1.api.put(`/api/v1/staff/${user.id}/personal`).send({
            name: "jonathan",
            lastname: "jones",
            cellphone: "145289653",
            birthday: "1985/10/5",
        });
        expect(response.body.msg).toEqual("STAFF_UPDATED");
    }));
    test("Invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api
            .put(`/api/v1/staff/dasdadjaj1231saa1/personal`)
            .send({
            name: "jonathan",
            lastname: "jones",
            cellphone: "145289653",
            birthday: "1985/10/5",
        });
        expect(response.body.msg).toEqual("INVALID_ID");
    }));
    test("staff not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api
            .put(`/api/v1/staff/${staff_helpers_1.staffListMock[0].id}/personal`)
            .send({
            name: "jonathan",
            lastname: "jones",
            cellphone: "145289653",
            birthday: "1985/10/5",
        });
        expect(response.body.msg).toEqual("STAFF_NOT_FOUND");
    }));
});
describe("change mail", () => {
    test("updated successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const staff = yield staff_helpers_1.daoStaff.findByUsername(staff_helpers_1.staffListMock[0].username);
        const response = yield staff_helpers_1.api
            .put(`/api/v1/staff/${staff.id}/mail`)
            .send({ mail: "jonathanlamas@gmail.com" });
        expect(response.body.msg).toEqual("MAIL_UPDATED");
    }));
    test("invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api
            .put(`/api/v1/staff/128312319991/mail`)
            .send({ mail: "jonathanlamas@gmail.com" });
        expect(response.body.msg).toEqual("INVALID_ID");
    }));
    test("staff not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api
            .put(`/api/v1/staff/${staff_helpers_1.staffListMock[0].id}/mail`)
            .send({ mail: "jonathanlamas@gmail.com" });
        expect(response.body.msg).toEqual("STAFF_NOT_FOUND");
    }));
    test("mail is the same", () => __awaiter(void 0, void 0, void 0, function* () {
        const staff = yield staff_helpers_1.daoStaff.findByUsername(staff_helpers_1.staffListMock[0].username);
        const response = yield staff_helpers_1.api
            .put(`/api/v1/staff/${staff.id}/mail`)
            .send({ mail: staff_helpers_1.staffListMock[0].mail });
        expect(response.body.msg).toEqual("MAIL_IS_THE_SAME");
    }));
    test("invalid mail", () => __awaiter(void 0, void 0, void 0, function* () {
        const staff = yield staff_helpers_1.daoStaff.findByUsername(staff_helpers_1.staffListMock[0].username);
        const response = yield staff_helpers_1.api
            .put(`/api/v1/staff/${staff.id}/mail`)
            .send({ mail: "juan carlos" });
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
});
describe("change username", () => {
    test("username updated", () => __awaiter(void 0, void 0, void 0, function* () {
        const staff = yield staff_helpers_1.daoStaff.findByUsername(staff_helpers_1.staffListMock[0].username);
        const response = yield staff_helpers_1.api
            .put(`/api/v1/staff/${staff.id}/username`)
            .send({ username: "juancarlos20" });
        expect(response.body.msg).toEqual("USERNAME_UPDATED");
    }));
    test("username is the same", () => __awaiter(void 0, void 0, void 0, function* () {
        const staff = yield staff_helpers_1.daoStaff.findByUsername(staff_helpers_1.staffListMock[0].username);
        const response = yield staff_helpers_1.api
            .put(`/api/v1/staff/${staff.id}/username`)
            .send({ username: staff.username });
        expect(response.body.msg).toEqual("USERNAME_IS_THE_SAME");
    }));
    test("username already in use", () => __awaiter(void 0, void 0, void 0, function* () {
        const staff = yield staff_helpers_1.daoStaff.findByUsername(staff_helpers_1.staffListMock[0].username);
        const response = yield staff_helpers_1.api
            .put(`/api/v1/staff/${staff.id}/username`)
            .send({ username: staff_helpers_1.staffListMock[1].username });
        expect(response.body.msg).toEqual("USERNAME_ALREADY_IN_USE");
    }));
    test("username is too short", () => __awaiter(void 0, void 0, void 0, function* () {
        const staff = yield staff_helpers_1.daoStaff.findByUsername(staff_helpers_1.staffListMock[0].username);
        const response = yield staff_helpers_1.api
            .put(`/api/v1/staff/${staff.id}/username`)
            .send({ username: "a" });
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
    test("username is too long", () => __awaiter(void 0, void 0, void 0, function* () {
        const staff = yield staff_helpers_1.daoStaff.findByUsername(staff_helpers_1.staffListMock[0].username);
        const response = yield staff_helpers_1.api.put(`/api/v1/staff/${staff.id}/username`).send({
            username: "abcdeiiiqqiqiqiqiqqedkjasdkjasdkjaskdjaskdajskdajsdkajdkasjdasqweqweqw",
        });
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
});
describe("change password", () => {
    test("password updated", () => __awaiter(void 0, void 0, void 0, function* () {
        const staff = yield staff_helpers_1.daoStaff.findByUsername(staff_helpers_1.staffListMock[0].username);
        const response = yield staff_helpers_1.api
            .put(`/api/v1/staff/${staff.id}/password`)
            .send({ password: "kukukuku" });
        expect(response.body.msg).toEqual("PASSWORD_UPDATED");
    }));
    test("password is the same", () => __awaiter(void 0, void 0, void 0, function* () {
        const staff = yield staff_helpers_1.daoStaff.findByUsername(staff_helpers_1.staffListMock[0].username);
        const response = yield staff_helpers_1.api
            .put(`/api/v1/staff/${staff.id}/password`)
            .send({ password: "147258" });
        expect(response.body.msg).toEqual("PASSWORD_IS_THE_SAME");
    }));
    test("password is too short", () => __awaiter(void 0, void 0, void 0, function* () {
        const staff = yield staff_helpers_1.daoStaff.findByUsername(staff_helpers_1.staffListMock[0].username);
        const response = yield staff_helpers_1.api
            .put(`/api/v1/staff/${staff.id}/password`)
            .send({ password: "11" });
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
    test("password is too long", () => __awaiter(void 0, void 0, void 0, function* () {
        const staff = yield staff_helpers_1.daoStaff.findByUsername(staff_helpers_1.staffListMock[0].username);
        const response = yield staff_helpers_1.api
            .put(`/api/v1/staff/${staff.id}/password`)
            .send({ password: "11asdasdasdasdasdqj4e2131231231231sdfdsfbpoil567" });
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
});
describe("find by id", () => {
    test("find by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const staff = yield staff_helpers_1.daoStaff.findByUsername(staff_helpers_1.staffListMock[0].username);
        const response = yield staff_helpers_1.api.get(`/api/v1/staff/${staff.id}`);
        expect(response.body.msg).toEqual("OK");
    }));
    test("invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api.get(`/api/v1/staff/234234234dfaa1`);
        expect(response.body.msg).toEqual("INVALID_ID");
    }));
    test("staff not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api.get(`/api/v1/staff/${staff_helpers_1.staffListMock[0].id}`);
        expect(response.body.msg).toEqual("STAFF_NOT_FOUND");
    }));
});
describe("update salary", () => {
    test("updated successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const staff = yield staff_helpers_1.daoStaff.findByUsername(staff_helpers_1.staffListMock[0].username);
        const response = yield staff_helpers_1.api
            .put(`/api/v1/staff/${staff.id}/salary`)
            .send({ salary: 5000 });
        expect(response.body.msg).toEqual("SALARY_UPDATED");
    }));
    test("user not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api
            .put(`/api/v1/staff/${staff_helpers_1.staffListMock[0].id}/salary`)
            .send({ salary: 5000 });
        expect(response.body.msg).toEqual("STAFF_NOT_FOUND");
    }));
    test("invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api
            .put(`/api/v1/staff/12312312/salary`)
            .send({ salary: 5000 });
        expect(response.body.msg).toEqual("INVALID_ID");
    }));
    test("invalid amount", () => __awaiter(void 0, void 0, void 0, function* () {
        const staff = yield staff_helpers_1.daoStaff.findByUsername(staff_helpers_1.staffListMock[0].username);
        const response = yield staff_helpers_1.api
            .put(`/api/v1/staff/${staff.id}/salary`)
            .send({ salary: 50000000 });
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
});
describe("update status", () => {
    test("status updated", () => __awaiter(void 0, void 0, void 0, function* () {
        const staff = yield staff_helpers_1.daoStaff.findByUsername(staff_helpers_1.staffListMock[0].username);
        const response = yield staff_helpers_1.api
            .put(`/api/v1/staff/${staff.id}/status`)
            .send({ status: "suspended" });
        expect(response.body.msg).toEqual("STATUS_UPDATED");
    }));
    test("invalid status", () => __awaiter(void 0, void 0, void 0, function* () {
        const staff = yield staff_helpers_1.daoStaff.findByUsername(staff_helpers_1.staffListMock[0].username);
        const response = yield staff_helpers_1.api
            .put(`/api/v1/staff/${staff.id}/status`)
            .send({ status: "vacationnnn" });
        expect(response.body.msg).toEqual("INVALID_STATUS");
    }));
    test("invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api
            .put(`/api/v1/staff/231ddddd/status`)
            .send({ status: "vacation" });
        expect(response.body.msg).toEqual("INVALID_ID");
    }));
    test("staff not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield staff_helpers_1.api
            .put(`/api/v1/staff/${staff_helpers_1.staffListMock[0].id}/status`)
            .send({ status: "vacation" });
        expect(response.body.msg).toEqual("STAFF_NOT_FOUND");
    }));
});
