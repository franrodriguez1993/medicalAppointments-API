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
const uuid_1 = require("uuid");
//DAOs:
const appointment_dao_1 = __importDefault(require("./appointment.dao"));
const doctor_dao_1 = __importDefault(require("../doctor/daos/doctor.dao"));
const staff_dao_1 = __importDefault(require("../staff/staff.dao"));
const patient_dao_1 = __importDefault(require("../patient/patient.dao"));
const day_dao_1 = __importDefault(require("../doctor/daos/day.dao"));
const daoAppointment = new appointment_dao_1.default();
const daoStaff = new staff_dao_1.default();
const daoPatient = new patient_dao_1.default();
const daoDoctor = new doctor_dao_1.default();
const daoDay = new day_dao_1.default();
class AppointmentService {
    /**   CREATE **/
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(data.id_doctor) ||
                !(0, uuid_1.validate)(data.id_patient) ||
                !(0, uuid_1.validate)(data.id_staff)) {
                return "INVALID ID";
            }
            //Find users:
            const staff = yield daoStaff.findByID(data.id_staff);
            if (!staff)
                return "STAFF_NOT_FOUND";
            const patient = yield daoPatient.findByID(data.id_patient);
            if (!patient)
                return "PATIENT_NOT_FOUND";
            const doctor = yield daoDoctor.findByID(data.id_doctor);
            if (!doctor)
                return "DOCTOR_NOT_FOUND";
            const day = yield daoDay.findByID(data.id_day);
            if (!day)
                return "DAY_NOT_FOUND";
            //Check Schedule:
            const checkDay = doctor.schedules.find((s) => s.id_day === data.id_day);
            if (!checkDay)
                return "INVALID_DOCTOR_SCHEDULE";
            //Check appointments:
            const listAppointments = yield daoAppointment.listDayAppointment(data.id_doctor, data.date);
            if (listAppointments.length >= 10)
                return "MAXIMUM_APPOINTMENTS";
            //If everything is ok:
            return yield daoAppointment.create(Object.assign(Object.assign({}, data), { id: `${(0, uuid_1.v4)()}` }));
        });
    }
    /**   LIST APPOINTMENT **/
    listAppointment(id_doctor, date) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id_doctor))
                return "INVALID_ID";
            const formatedDate = date.split("-").join("/");
            const doctor = yield daoDoctor.findByID(id_doctor);
            if (!doctor)
                return "DOCTOR_NOT_FOUND";
            return yield daoAppointment.listDayAppointment(id_doctor, formatedDate);
        });
    }
    /**   DELETE APPOINTMENT **/
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id))
                return "INVALID_ID";
            return yield daoAppointment.deleteOne(id);
        });
    }
}
exports.default = AppointmentService;
