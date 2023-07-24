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
const user_dao_1 = require("../user/user.dao");
const user_model_1 = __importDefault(require("../user/user.model"));
const patient_model_1 = __importDefault(require("./patient.model"));
const pagination_1 = require("../../utils/pagination");
class PatientDao extends user_dao_1.UserDao {
    constructor() {
        super(patient_model_1.default);
    }
    /** CREATE **/
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield patient_model_1.default.create(data);
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
    /**  LIST PATIENTS  **/
    list(page = 0, size = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit, offset } = (0, pagination_1.pagination)(page, size);
                const data = yield patient_model_1.default.findAndCountAll({
                    limit,
                    offset,
                    attributes: { exclude: ["id_user"] },
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
    /** FIND BY SOCIAL NUMBER **/
    FindBySN(socialNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield patient_model_1.default.findOne({ where: { social_number: socialNumber } });
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
                return yield patient_model_1.default.findOne({ where: { id }, include: { model: user_model_1.default } });
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
    /** UPDATE SOCIAL NUMBER **/
    updateSN(id, social_number) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield patient_model_1.default.update({ social_number: social_number }, { where: { id } });
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
exports.default = PatientDao;
