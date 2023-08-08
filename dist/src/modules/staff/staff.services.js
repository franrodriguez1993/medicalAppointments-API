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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const staff_dao_1 = __importDefault(require("./staff.dao"));
const uuid_1 = require("uuid");
class StaffService {
    constructor() {
        this.daoStaff = new staff_dao_1.default();
    }
    /**  REGISTER STAFF **/
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const id_user = (0, uuid_1.v4)();
            //CHECK USER:
            const user = yield this.daoStaff.findUserByDNI(data.dni);
            //IF EXISTS:
            if (user) {
                if (user.staff) {
                    throw new Error("DNI_IN_USE");
                }
                else {
                    if (user.mail === data.mail) {
                        const checkUsername = yield this.daoStaff.findByUsername(data.username);
                        if (checkUsername)
                            throw new Error("USERNAME_IN_USE");
                        const newStaff = yield this.daoStaff.register({
                            id,
                            id_user: user.id,
                            username: data.username,
                            password: data.password,
                            status: data.status,
                            seniority: data.seniority,
                            salary: data.salary,
                        });
                        if (!newStaff)
                            throw new Error("ERROR_CREATING_STAFF");
                        return newStaff.id;
                    }
                    else {
                        throw new Error("USER_REGISTERED_WITH_OTHER_MAIL");
                    }
                }
            }
            //IF NOT EXISTS:
            const checkMail = yield this.daoStaff.findUserByMail(data.mail);
            if (checkMail)
                throw new Error("MAIL_IN_USE");
            const checkUsername = yield this.daoStaff.findByUsername(data.username);
            if (checkUsername)
                throw new Error("USERNAME_IN_USE");
            const newUser = yield this.daoStaff.createUser({
                id: id_user,
                name: data.name,
                lastname: data.lastname,
                mail: data.mail,
                cellphone: data.cellphone,
                dni: data.dni,
                birthday: data.birthday,
            });
            if (!newUser)
                throw new Error("ERROR_CREATING_USER");
            const newStaff = yield this.daoStaff.register({
                id,
                id_user,
                username: data.username,
                password: data.password,
                status: data.status,
                seniority: data.seniority,
                salary: data.salary,
            });
            if (!newStaff)
                throw new Error("ERROR_CREATING_STAFF");
            return newStaff.id;
        });
    }
    /**  LOGIN STAFF **/
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUser = yield this.daoStaff.findByUsername(username);
            if (!checkUser)
                throw new Error("INVALID_CREDENTIALS");
            return yield this.daoStaff.login(username, password);
        });
    }
    /**  LIST STAFF  **/
    list(page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.daoStaff.listStaff(page, size);
        });
    }
    /**  UPDATE PERSONAL DATA STAFF **/
    updatePersonalData(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id))
                throw new Error("INVALID_ID");
            const staff = yield this.daoStaff.findByID(id);
            if (!staff)
                throw new Error("STAFF_NOT_FOUND");
            return yield this.daoStaff.updateUser(staff.user.id, data);
        });
    }
    /**  CHANGE MAIL **/
    changeMail(id, mail) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id))
                throw new Error("INVALID_ID");
            const staff = yield this.daoStaff.findByID(id);
            if (!staff)
                throw new Error("STAFF_NOT_FOUND");
            return yield this.daoStaff.changeMail(staff.user.id, mail);
        });
    }
    /**  CHANGE USERNAME **/
    changeUsername(id, username) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id))
                throw new Error("INVALID_ID");
            const staff = yield this.daoStaff.findByID(id);
            if (!staff)
                throw new Error("STAFF_NOT_FOUND");
            if (staff.username === username)
                throw new Error("USERNAME_IS_THE_SAME");
            const checkUsername = yield this.daoStaff.findByUsername(username);
            if (checkUsername)
                throw new Error("USERNAME_ALREADY_IN_USE");
            return yield this.daoStaff.changeUsername(id, username);
        });
    }
    /**  CHANGE PASSWORD **/
    changePassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id))
                throw new Error("INVALID_ID");
            const staff = yield this.daoStaff.findByID(id);
            if (!staff)
                throw new Error("STAFF_NOT_FOUND");
            return yield this.daoStaff.changePassword(id, password);
        });
    }
    /**  FIND BY ID  **/
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id))
                throw new Error("INVALID_ID");
            const staff = yield this.daoStaff.findByID(id);
            if (!staff)
                throw new Error("STAFF_NOT_FOUND");
            return staff;
        });
    }
    /**  UPDATE SALARY  **/
    updateSalary(id, salary) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id))
                throw new Error("INVALID_ID");
            const staff = yield this.daoStaff.findByID(id);
            if (!staff)
                throw new Error("STAFF_NOT_FOUND");
            return yield this.daoStaff.updateSalary(id, salary);
        });
    }
    /**  UPDATE STATUS  **/
    updateStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const statusList = ["active", "vacation", "licence", "suspended"];
            if (!(0, uuid_1.validate)(id))
                throw new Error("INVALID_ID");
            const staff = yield this.daoStaff.findByID(id);
            if (!staff)
                throw new Error("STAFF_NOT_FOUND");
            if (!statusList.find((s) => s === status))
                throw new Error("INVALID_STATUS");
            return yield this.daoStaff.updateStatus(id, status);
        });
    }
}
exports.default = StaffService;
