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
const daoStaff = new staff_dao_1.default();
class StaffService {
    /**  REGISTER STAFF **/
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const id_user = (0, uuid_1.v4)();
            //CHECK USER:
            const user = yield daoStaff.findUserByDNI(data.dni);
            //IF EXISTS:
            if (user) {
                if (user.staff) {
                    return "DNI_IN_USE";
                }
                else {
                    if (user.mail === data.mail) {
                        const checkUsername = yield daoStaff.findByUsername(data.username);
                        if (checkUsername)
                            return "USERNAME_IN_USE";
                        const newStaff = yield daoStaff.register({
                            id,
                            id_user: user.id,
                            username: data.username,
                            password: data.password,
                            status: data.status,
                            seniority: data.seniority,
                            salary: data.salary,
                        });
                        if (!newStaff)
                            return "ERROR_CREATING_STAFF";
                        return newStaff.id;
                    }
                    else {
                        return "USER_REGISTERED_WITH_OTHER_MAIL";
                    }
                }
            }
            //IF NOT EXISTS:
            const checkMail = yield daoStaff.findUserByMail(data.mail);
            if (checkMail)
                return "MAIL_IN_USE";
            const checkUsername = yield daoStaff.findByUsername(data.username);
            if (checkUsername)
                return "USERNAME_IN_USE";
            const newUser = yield daoStaff.createUser({
                id: id_user,
                name: data.name,
                lastname: data.lastname,
                mail: data.mail,
                cellphone: data.cellphone,
                dni: data.dni,
                birthday: data.birthday,
            });
            if (!newUser)
                return "ERROR_CREATING_USER";
            const newStaff = yield daoStaff.register({
                id,
                id_user,
                username: data.username,
                password: data.password,
                status: data.status,
                seniority: data.seniority,
                salary: data.salary,
            });
            if (!newStaff)
                return "ERROR_CREATING_STAFF";
            return newStaff.id;
        });
    }
    /**  LOGIN STAFF **/
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUser = yield daoStaff.findByUsername(username);
            if (!checkUser)
                return "INVALID_CREDENTIALS";
            return yield daoStaff.login(username, password);
        });
    }
    /**  LIST STAFF  **/
    list(page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield daoStaff.listStaff(page, size);
        });
    }
    /**  UPDATE PERSONAL DATA STAFF **/
    updatePersonalData(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id))
                return "INVALID_ID";
            const staff = yield daoStaff.findByID(id);
            if (!staff)
                return "STAFF_NOT_FOUND";
            return yield daoStaff.updateUser(staff.user.id, data);
        });
    }
    /**  CHANGE MAIL **/
    changeMail(id, mail) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id))
                return "INVALID_ID";
            const staff = yield daoStaff.findByID(id);
            if (!staff)
                return "STAFF_NOT_FOUND";
            return yield daoStaff.changeMail(staff.user.id, mail);
        });
    }
    /**  CHANGE USERNAME **/
    changeUsername(id, username) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id))
                return "INVALID_ID";
            const staff = yield daoStaff.findByID(id);
            if (!staff)
                return "STAFF_NOT_FOUND";
            if (staff.username === username)
                return "USERNAME_IS_THE_SAME";
            const checkUsername = yield daoStaff.findByUsername(username);
            if (checkUsername)
                return "USERNAME_ALREADY_IN_USE";
            return yield daoStaff.changeUsername(id, username);
        });
    }
    /**  CHANGE PASSWORD **/
    changePassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id))
                return "INVALID_ID";
            const staff = yield daoStaff.findByID(id);
            if (!staff)
                return "STAFF_NOT_FOUND";
            return yield daoStaff.changePassword(id, password);
        });
    }
    /**  FIND BY ID  **/
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id))
                return "INVALID_ID";
            const staff = yield daoStaff.findByID(id);
            if (!staff)
                return "STAFF_NOT_FOUND";
            return staff;
        });
    }
    /**  UPDATE SALARY  **/
    updateSalary(id, salary) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id))
                return "INVALID_ID";
            const staff = yield daoStaff.findByID(id);
            if (!staff)
                return "STAFF_NOT_FOUND";
            return yield daoStaff.updateSalary(id, salary);
        });
    }
    /**  UPDATE STATUS  **/
    updateStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const statusList = ["active", "vacation", "licence", "suspended"];
            if (!(0, uuid_1.validate)(id))
                return "INVALID_ID";
            const staff = yield daoStaff.findByID(id);
            if (!staff)
                return "STAFF_NOT_FOUND";
            if (!statusList.find((s) => s === status))
                return "INVALID_STATUS";
            return yield daoStaff.updateStatus(id, status);
        });
    }
}
exports.default = StaffService;
