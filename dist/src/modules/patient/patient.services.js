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
const patient_dao_1 = __importDefault(require("./patient.dao"));
const uuid_1 = require("uuid");
const daoPatient = new patient_dao_1.default();
class PatientService {
    /**  CREATE  **/
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const id_user = (0, uuid_1.v4)();
            const user = yield daoPatient.findUserByDNI(data.dni);
            //IF USER EXISTS:
            if (user) {
                if (user.patient) {
                    return "PATIENT_ALREADY_EXISTS";
                }
                else {
                    if (user.mail !== data.mail) {
                        return "USER_REGISTERED_WITH_ANOTHER_MAIL";
                    }
                    else {
                        const patient = yield daoPatient.create({
                            id,
                            id_user: user.id,
                            social_number: data.social_number,
                        });
                        if (!patient)
                            return "ERROR_CREATING_PATIENT";
                        return patient.id;
                    }
                }
            }
            //IF USER DOESN'T EXISTS:
            const checkMail = yield daoPatient.findUserByMail(data.mail);
            if (checkMail)
                return "MAIL_IN_USE";
            const newUser = yield daoPatient.createUser({
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
            const checkSN = yield daoPatient.FindBySN(data.social_number);
            if (checkSN)
                return "SOCIAL_NUMBER_IN_USE";
            const newPatient = yield daoPatient.create({
                id,
                id_user,
                social_number: data.social_number,
            });
            if (!newPatient)
                return "ERROR_CREATING_PATIENT";
            return newPatient.id;
        });
    }
    /**  LIST PATIENTS  **/
    list(page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield daoPatient.list(page, size);
        });
    }
    /**  FIND PATIENT  **/
    findByDNI(dni) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedDNI = parseInt(dni).toString();
            if (isNaN(parseInt(dni)) || parsedDNI.length < 7 || parsedDNI.length > 8)
                return "INVALID_DNI";
            const patient = yield daoPatient.findUserByDNI(dni);
            if (!patient)
                return "PATIENT_NOT_FOUND";
            if (!patient.patient)
                return "USER_IS_NOT_PATIENT";
            return patient;
        });
    }
    /**  UPDATE PERSONAL DATA  **/
    updatePD(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id))
                return "INVALID_ID";
            const patient = yield daoPatient.findByID(id);
            if (!patient)
                return "PATIENT_NOT_FOUND";
            return yield daoPatient.updateUser(patient.user.id, data);
        });
    }
    /**  UPDATE SOCIAL NUMBER  **/
    updateSN(id, social_number) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id))
                return "INVALID_ID";
            const patient = yield daoPatient.findByID(id);
            if (!patient)
                return "PATIENT_NOT_FOUND";
            return yield daoPatient.updateSN(id, social_number);
        });
    }
    /**  UPDATE MAIL  **/
    changeMail(id, mail) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id))
                return "INVALID_ID";
            const patient = yield daoPatient.findByID(id);
            if (!patient)
                return "PATIENT_NOT_FOUND";
            return yield daoPatient.changeMail(patient.id_user, mail);
        });
    }
}
exports.default = PatientService;
