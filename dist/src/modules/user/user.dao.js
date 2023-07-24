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
exports.UserDao = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const staff_model_1 = __importDefault(require("../staff/staff.model"));
const doctor_model_1 = __importDefault(require("../doctor/models/doctor.model"));
const patient_model_1 = __importDefault(require("../patient/patient.model"));
class UserDao {
    /**  CREATE USER  **/
    constructor(m) {
        this.model = m;
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.default.create(data);
            }
            catch (e) {
                if (e instanceof Error) {
                    throw new Error(e.message);
                }
                else
                    throw new Error(e.toString());
            }
        });
    }
    /** --- FIND BY ID ---  **/
    findUserByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.default.findOne({
                    where: { id },
                    include: [{ model: staff_model_1.default }, { model: doctor_model_1.default }, { model: patient_model_1.default }],
                });
            }
            catch (e) {
                if (e instanceof Error) {
                    throw new Error(e.message);
                }
                else
                    throw new Error(e.toString());
            }
        });
    }
    /** --- FIND BY MAIL ---  **/
    findUserByMail(mail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.default.findOne({
                    where: { mail },
                    include: [{ model: staff_model_1.default }, { model: doctor_model_1.default }, { model: patient_model_1.default }],
                });
            }
            catch (e) {
                if (e instanceof Error) {
                    throw new Error(e.message);
                }
                else
                    throw new Error(e.toString());
            }
        });
    }
    /** --- FIND BY DNI ---  **/
    findUserByDNI(dni) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.default.findOne({
                    where: { dni },
                    include: [{ model: staff_model_1.default }, { model: doctor_model_1.default }, { model: patient_model_1.default }],
                });
            }
            catch (e) {
                if (e instanceof Error) {
                    throw new Error(e.message);
                }
                else
                    throw new Error(e.toString());
            }
        });
    }
    /**  UPDATE USER  **/
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.default.update(Object.assign({}, data), { where: { id } });
            }
            catch (e) {
                if (e instanceof Error) {
                    throw new Error(e.message);
                }
                else
                    throw new Error(e.toString());
            }
        });
    }
    changeMail(id, mail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findOne({ where: { id } });
                if (user.mail === mail)
                    return "MAIL_IS_THE_SAME";
                const checkMail = yield user_model_1.default.findOne({ where: { mail } });
                if (checkMail)
                    return "MAIL_IN_USE";
                return yield user_model_1.default.update({ mail }, { where: { id } });
            }
            catch (e) {
                if (e instanceof Error) {
                    throw new Error(e.message);
                }
                else
                    throw new Error(e.toString());
            }
        });
    }
    /**  DELETE USER  **/
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.default.destroy({
                    where: { id },
                });
            }
            catch (e) {
                if (e instanceof Error) {
                    throw new Error(e.message);
                }
                else
                    throw new Error(e.toString());
            }
        });
    }
    /** --- DELETE ALL ---  **/
    deleteUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.default.destroy({ where: {} });
            }
            catch (e) {
                if (e instanceof Error) {
                    throw new Error(e.message);
                }
                else
                    throw new Error(e.toString());
            }
        });
    }
    /** DELETE ONE  **/
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.destroy({
                    where: { id },
                });
            }
            catch (e) {
                if (e instanceof Error) {
                    throw new Error(e.message);
                }
                else
                    throw new Error(e.toString());
            }
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.destroy({
                    where: {},
                });
            }
            catch (e) {
                if (e instanceof Error) {
                    throw new Error(e.message);
                }
                else
                    throw new Error(e.toString());
            }
        });
    }
}
exports.UserDao = UserDao;
