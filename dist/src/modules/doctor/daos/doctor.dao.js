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
const user_dao_1 = require("../../user/user.dao");
const user_model_1 = __importDefault(require("../../user/user.model"));
const days_model_1 = __importDefault(require("../models/days.model"));
const doctor_model_1 = __importDefault(require("../models/doctor.model"));
const schedules_model_1 = __importDefault(require("../models/schedules.model"));
const specialties_model_1 = __importDefault(require("../models/specialties.model"));
//Pagination:
const pagination_1 = require("../../../utils/pagination");
class DoctorDao extends user_dao_1.UserDao {
    constructor() {
        super(doctor_model_1.default);
    }
    /** CREATE DOCTOR  **/
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield doctor_model_1.default.create(data);
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /**  LIST DOCTORS  **/
    list(page = 0, size = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit, offset } = (0, pagination_1.pagination)(page, size);
                const data = yield doctor_model_1.default.findAndCountAll({
                    limit,
                    offset,
                    attributes: { exclude: ["id_specialty", "id_user"] },
                    include: [
                        { model: user_model_1.default, attributes: { exclude: ["createdAt", "updatedAt"] } },
                        { model: specialties_model_1.default },
                    ],
                });
                return (0, pagination_1.paginatedData)(data, page, limit);
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** FIND BY ID  **/
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield doctor_model_1.default.findOne({
                    where: { id },
                    attributes: { exclude: ["id_user", "id_specialty"] },
                    include: [
                        {
                            model: user_model_1.default,
                            attributes: { exclude: ["createdAt", "updatedAt"] },
                        },
                        {
                            model: specialties_model_1.default,
                            attributes: { exclude: ["createdAt", "updatedAt"] },
                        },
                        {
                            model: schedules_model_1.default,
                            attributes: {
                                exclude: ["createdAt", "updatedAt", "id_doctor"],
                            },
                            include: [{ model: days_model_1.default, attributes: { exclude: ["id"] } }],
                        },
                    ],
                });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** UPDATE SPECIALTY **/
    updateSpecialty(id, id_specialty) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield doctor_model_1.default.update({ id_specialty }, { where: { id } });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /**  ADD SCHEDULE **/
    addSchedule(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const check = yield schedules_model_1.default.findOne({
                    where: { id_doctor: data.id_doctor, id_day: data.id_day },
                });
                if (check)
                    return "SCHEDULE_ALREADY_EXISTS";
                return yield schedules_model_1.default.create(data);
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /**  UPDATE SCHEDULE **/
    updateSchedule(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schedule = yield schedules_model_1.default.findOne({
                    where: { id_doctor: data.id_doctor, id_day: data.id_day },
                });
                if (!schedule)
                    return "SCHEDULE_NOT_FOUND";
                return yield schedules_model_1.default.update(data, {
                    where: { id: schedule.id },
                });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /**  DELETE SCHEDULE **/
    deleteSchedule(id_doctor, id_day) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schedule = yield schedules_model_1.default.findOne({
                    where: { id_doctor, id_day },
                });
                if (!schedule)
                    return "SCHEDULE_NOT_FOUND";
                return yield schedules_model_1.default.destroy({ where: { id: schedule.id } });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.default = DoctorDao;
