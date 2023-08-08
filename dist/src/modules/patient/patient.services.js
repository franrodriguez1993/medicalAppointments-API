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
class PatientService {
    constructor() {
        this.daoPatient = new patient_dao_1.default();
    }
    /**  CREATE  **/
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const id_user = (0, uuid_1.v4)();
            const user = yield this.daoPatient.findUserByDNI(data.dni);
            //IF USER EXISTS:
            if (user) {
                if (user.patient) {
                    throw new Error("PATIENT_ALREADY_EXISTS");
                }
                else {
                    if (user.mail !== data.mail) {
                        throw new Error("USER_REGISTERED_WITH_ANOTHER_MAIL");
                    }
                    else {
                        const checkSN = yield this.daoPatient.FindBySN(data.social_number);
                        if (checkSN)
                            throw new Error("SOCIAL_NUMBER_IN_USE");
                        const patient = yield this.daoPatient.create({
                            id,
                            id_user: user.id,
                            social_number: data.social_number,
                        });
                        if (!patient)
                            throw new Error("ERROR_CREATING_PATIENT");
                        return patient.id;
                    }
                }
            }
            //IF USER DOESN'T EXISTS:
            const checkMail = yield this.daoPatient.findUserByMail(data.mail);
            if (checkMail)
                throw new Error("MAIL_IN_USE");
            const newUser = yield this.daoPatient.createUser({
                id: id_user,
                name: data.name,
                lastname: data.lastname,
                mail: data.mail,
                cellphone: data.cellphone,
                dni: data.dni,
                birthday: data.birthday,
            });
            if (!newUser)
                throw new Error("ERROR_CREATING_USER");
            const checkSN = yield this.daoPatient.FindBySN(data.social_number);
            if (checkSN)
                throw new Error("SOCIAL_NUMBER_IN_USE");
            const newPatient = yield this.daoPatient.create({
                id,
                id_user,
                social_number: data.social_number,
            });
            if (!newPatient)
                throw new Error("ERROR_CREATING_PATIENT");
            return newPatient.id;
        });
    }
    /**  LIST PATIENTS  **/
    list(page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.daoPatient.list(page, size);
        });
    }
    /**  FIND PATIENT  **/
    findByDNI(dni) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedDNI = parseInt(dni).toString();
            if (isNaN(parseInt(dni)) || parsedDNI.length < 7 || parsedDNI.length > 8)
                throw new Error("INVALID_DNI");
            const patient = yield this.daoPatient.findUserByDNI(dni);
            if (!patient)
                throw new Error("PATIENT_NOT_FOUND");
            if (!patient.patient)
                throw new Error("USER_IS_NOT_PATIENT");
            return patient;
        });
    }
    /**  UPDATE PERSONAL DATA  **/
    updatePD(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id))
                throw new Error("INVALID_ID");
            const patient = yield this.daoPatient.findByID(id);
            if (!patient)
                throw new Error("PATIENT_NOT_FOUND");
            return yield this.daoPatient.updateUser(patient.user.id, data);
        });
    }
    /**  UPDATE SOCIAL NUMBER  **/
    updateSN(id, social_number) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id))
                throw new Error("INVALID_ID");
            const patient = yield this.daoPatient.findByID(id);
            if (!patient)
                throw new Error("PATIENT_NOT_FOUND");
            return yield this.daoPatient.updateSN(id, social_number);
        });
    }
    /**  UPDATE MAIL  **/
    changeMail(id, mail) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id))
                throw new Error("INVALID_ID");
            const patient = yield this.daoPatient.findByID(id);
            if (!patient)
                throw new Error("PATIENT_NOT_FOUND");
            return yield this.daoPatient.changeMail(patient.id_user, mail);
        });
    }
}
exports.default = PatientService;
