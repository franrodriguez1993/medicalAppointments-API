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
const patient_model_1 = __importDefault(require("../patient/patient.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const appointment_model_1 = __importDefault(require("./appointment.model"));
class AppointmentDao {
    /**  CREATE **/
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointment = yield appointment_model_1.default.findOne({
                    where: {
                        date: data.date,
                        id_doctor: data.id_doctor,
                        id_patient: data.id_patient,
                        id_day: data.id_day,
                    },
                });
                if (appointment)
                    return "APPOINTMENT_ALREADY_EXISTS";
                return yield appointment_model_1.default.create(data);
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /**  LIST DAY APPOINTMENT **/
    listDayAppointment(id_doctor, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield appointment_model_1.default.findAll({
                    where: { id_doctor, date },
                    include: {
                        model: patient_model_1.default,
                        include: [
                            {
                                model: user_model_1.default,
                                attributes: { exclude: ["createdAt", "updatedAt"] },
                            },
                        ],
                        attributes: { exclude: ["createdAt", "updatedAt", "id_user"] },
                    },
                    attributes: { exclude: ["id_patient", "createdAt", "updatedAt"] },
                });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /**  DELETE APPOITNMENT **/
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield appointment_model_1.default.destroy({ where: { id } });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.default = AppointmentDao;
