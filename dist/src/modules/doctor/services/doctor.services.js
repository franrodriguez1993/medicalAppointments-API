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
const doctor_dao_1 = __importDefault(require("../daos/doctor.dao"));
const specialty_dao_1 = __importDefault(require("../daos/specialty.dao"));
const day_dao_1 = __importDefault(require("../daos/day.dao"));
const daoDoctor = new doctor_dao_1.default();
const daoSpecialty = new specialty_dao_1.default();
const daoDay = new day_dao_1.default();
class DoctorService {
    /**  CREATE **/
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const id_user = (0, uuid_1.v4)();
            //CHECK USER FOR USER:
            const user = yield daoDoctor.findUserByDNI(data.dni);
            //check for specialty:
            if (!(0, uuid_1.validate)(data.id_specialty))
                return "INVALID_ID";
            const specialty = yield daoSpecialty.findByID(data.id_specialty);
            if (!specialty)
                return "SPECIALTY_NOT_FOUND";
            if (user) {
                //IF USER EXISTS:
                if (user.doctor) {
                    return "DOCTOR_ALREADY_REGISTERED";
                }
                else {
                    if (user.mail === data.mail) {
                        const newDoc = yield daoDoctor.create({
                            id,
                            id_user: user.id,
                            id_specialty: data.id_specialty,
                        });
                        if (!newDoc)
                            return "ERROR_CREATING_DOCTOR";
                        return newDoc.id;
                    }
                    else {
                        return "USER_REGISTERED_WITH_OTHER_MAIL";
                    }
                }
            }
            //IF USER DOESN'T EXISTS:
            const newUser = yield daoDoctor.createUser({
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
            const newDoctor = yield daoDoctor.create({
                id,
                id_user,
                id_specialty: data.id_specialty,
            });
            if (!newDoctor)
                return "ERROR_CREATING_DOCTOR";
            return newDoctor.id;
        });
    }
    /**  LIST DOCTORS **/
    list(page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield daoDoctor.list(page, size);
        });
    }
    /**  FIND BY ID **/
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id))
                return "INVALID_ID";
            const doctor = yield daoDoctor.findByID(id);
            if (!doctor)
                return "DOCTOR_NOT_FOUND";
            return doctor;
        });
    }
    /**  UPDATE DATA **/
    updateData(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id))
                return "INVALID_ID";
            const doctor = yield daoDoctor.findByID(id);
            if (!doctor)
                return "DOCTOR_NOT_FOUND";
            return yield daoDoctor.updateUser(id, data);
        });
    }
    /**  UPDATE MAIL **/
    updateMail(id, mail) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id))
                return "INVALID_ID";
            const doctor = yield daoDoctor.findByID(id);
            if (!doctor)
                return "DOCTOR_NOT_FOUND";
            return yield daoDoctor.changeMail(doctor.user.id, mail);
        });
    }
    /**  UPDATE SPECIALTY **/
    updateSpecialty(id, id_specialty) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id) || !(0, uuid_1.validate)(id_specialty))
                return "INVALID_ID";
            const doctor = yield daoDoctor.findByID(id);
            if (!doctor)
                return "DOCTOR_NOT_FOUND";
            const specialty = yield daoSpecialty.findByID(id_specialty);
            if (!specialty)
                return "SPECIALTY_NOT_FOUND";
            return yield daoDoctor.updateSpecialty(id, id_specialty);
        });
    }
    /**  ADD SCHEDULE **/
    addSchedule(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(data.id_doctor))
                return "INVALID_ID";
            const doctor = yield daoDoctor.findByID(data.id_doctor);
            if (!doctor)
                return "DOCTOR_NOT_FOUND";
            const day = yield daoDay.findByName(data.day);
            if (!day)
                return "DAY_NOT_FOUND";
            return yield daoDoctor.addSchedule(Object.assign(Object.assign({}, data), { id: `${(0, uuid_1.v4)()}`, id_day: day.id }));
        });
    }
    /**  UPDATE SCHEDULE **/
    updateSchedule(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(data.id_doctor))
                return "INVALID_ID";
            const doctor = yield daoDoctor.findByID(data.id_doctor);
            if (!doctor)
                return "DOCTOR_NOT_FOUND";
            const day = yield daoDay.findByName(data.day);
            if (!day)
                return "DAY_NOT_FOUND";
            return yield daoDoctor.updateSchedule(Object.assign(Object.assign({}, data), { id_day: day.id }));
        });
    }
    /**  DELETE SCHEDULE **/
    deleteSchedule(id_doctor, name_day) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id_doctor))
                return "INVALID_ID";
            const doctor = yield daoDoctor.findByID(id_doctor);
            if (!doctor)
                return "DOCTOR_NOT_FOUND";
            const day = yield daoDay.findByName(name_day);
            if (!day)
                return "DAY_NOT_FOUND";
            return yield daoDoctor.deleteSchedule(id_doctor, day.id);
        });
    }
}
exports.default = DoctorService;
