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
class AppointmentService {
    constructor() {
        this.daoAppointment = new appointment_dao_1.default();
        this.daoStaff = new staff_dao_1.default();
        this.daoPatient = new patient_dao_1.default();
        this.daoDoctor = new doctor_dao_1.default();
        this.daoDay = new day_dao_1.default();
    }
    /**   CREATE **/
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(data.id_doctor) ||
                !(0, uuid_1.validate)(data.id_patient) ||
                !(0, uuid_1.validate)(data.id_staff)) {
                throw new Error("INVALID ID");
            }
            //Find users:
            const staff = yield this.daoStaff.findByID(data.id_staff);
            if (!staff)
                throw new Error("STAFF_NOT_FOUND");
            const patient = yield this.daoPatient.findByID(data.id_patient);
            if (!patient)
                throw new Error("PATIENT_NOT_FOUND");
            const doctor = yield this.daoDoctor.findByID(data.id_doctor);
            if (!doctor)
                throw new Error("DOCTOR_NOT_FOUND");
            const day = yield this.daoDay.findByID(data.id_day);
            if (!day)
                throw new Error("DAY_NOT_FOUND");
            //Check Schedule:
            const checkDay = doctor.schedules.find((s) => s.id_day === data.id_day);
            if (!checkDay)
                throw new Error("INVALID_DOCTOR_SCHEDULE");
            //Check appointments:
            const listAppointments = yield this.daoAppointment.listDayAppointment(data.id_doctor, data.date);
            if (listAppointments.length >= 10)
                throw new Error("MAXIMUM_APPOINTMENTS");
            //If everything is ok:
            return yield this.daoAppointment.create(Object.assign(Object.assign({}, data), { id: `${(0, uuid_1.v4)()}` }));
        });
    }
    /**   LIST APPOINTMENT **/
    listAppointment(id_doctor, date) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id_doctor))
                throw new Error("INVALID_ID");
            const formatedDate = date.split("-").join("/");
            const doctor = yield this.daoDoctor.findByID(id_doctor);
            if (!doctor)
                throw new Error("DOCTOR_NOT_FOUND");
            return yield this.daoAppointment.listDayAppointment(id_doctor, formatedDate);
        });
    }
    /**   DELETE APPOINTMENT **/
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id))
                throw new Error("INVALID_ID");
            return yield this.daoAppointment.deleteOne(id);
        });
    }
}
exports.default = AppointmentService;
