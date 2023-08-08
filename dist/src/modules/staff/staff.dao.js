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
const staff_model_1 = __importDefault(require("./staff.model"));
const bcryptHandler_1 = require("../../utils/bcryptHandler");
const user_dao_1 = require("../user/user.dao");
const jwtHandler_1 = require("../../utils/jwtHandler");
const user_model_1 = __importDefault(require("../user/user.model"));
const pagination_1 = require("../../utils/pagination");
class StaffDao extends user_dao_1.UserDao {
    constructor() {
        super(staff_model_1.default);
    }
    /**  REGISTER STAFF  **/
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashPass = yield (0, bcryptHandler_1.encrypt)(data.password);
                return yield staff_model_1.default.create(Object.assign(Object.assign({}, data), { password: hashPass }));
            }
            catch (e) {
                this.deleteUser(data.id_user).then((res) => {
                    if (e instanceof Error) {
                        throw new Error(e.message);
                    }
                    else
                        throw new Error(e.toString());
                });
            }
        });
    }
    /** LOGIN USER **/
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield staff_model_1.default.findOne({ where: { username } });
                const checkPass = yield (0, bcryptHandler_1.verifyEncrypt)(password, user.password);
                if (!checkPass)
                    throw new Error("INVALID_CREDENTIALS");
                const jwt = (0, jwtHandler_1.generateToken)(user.id);
                return { uid: user.id, jwt };
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
    /** FIND BY ID **/
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield staff_model_1.default.findOne({
                    where: { id },
                    attributes: { exclude: ["id_user", "password"] },
                    include: {
                        model: user_model_1.default,
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                    },
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
    /**  LIST STAFFS  **/
    listStaff(page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit, offset } = (0, pagination_1.pagination)(page, size);
                const data = yield staff_model_1.default.findAndCountAll({
                    limit,
                    offset,
                    attributes: { exclude: ["id_user", "password"] },
                    include: {
                        model: user_model_1.default,
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                    },
                });
                return (0, pagination_1.paginatedData)(data, page, limit);
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
    /** FIND BY USERNAME **/
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield staff_model_1.default.findOne({
                    where: { username },
                    attributes: { exclude: ["id_user", "password"] },
                    include: {
                        model: user_model_1.default,
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                    },
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
    /** CHANGE USERNAME **/
    changeUsername(id, username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield staff_model_1.default.update({ username }, { where: { id } });
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
    /**  CHANGE PASSWORD  **/
    changePassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const staff = yield staff_model_1.default.findOne({ where: { id } });
                const checkPass = yield (0, bcryptHandler_1.verifyEncrypt)(password, staff.password);
                if (checkPass)
                    throw new Error("PASSWORD_IS_THE_SAME");
                const hashPass = yield (0, bcryptHandler_1.encrypt)(password);
                return yield staff_model_1.default.update({ password: hashPass }, { where: { id } });
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
    /**  UPDATE SALARY  **/
    updateSalary(id, salary) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield staff_model_1.default.update({ salary }, { where: { id } });
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
    /**  UPDATE STATUS  **/
    updateStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield staff_model_1.default.update({ status }, { where: { id } });
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
exports.default = StaffDao;
