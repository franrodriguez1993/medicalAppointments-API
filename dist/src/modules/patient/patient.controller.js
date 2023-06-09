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
const patient_services_1 = __importDefault(require("./patient.services"));
const logger_1 = __importDefault(require("../../utils/logger"));
const service = new patient_services_1.default();
class PatientController {
    /**  CREATE  **/
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const resService = yield service.create(data);
                if (resService === "PATIENT_ALREADY_EXISTS" ||
                    resService === "USER_REGISTERED_WITH_ANOTHER_MAIL" ||
                    resService === "MAIL_IN_USE" ||
                    resService === "SOCIAL_NUMBER_IN_USE")
                    return res.status(400).json({ status: 400, msg: resService });
                else if (resService === "ERROR_CREATING_USER" ||
                    resService === "ERROR_CREATING_PATIENT")
                    return res.status(500).json({ status: 500, msg: resService });
                else
                    return res
                        .status(201)
                        .json({ status: 201, msg: "PATIENT_CREATED", data: resService });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /**  LIST PATIENTS  **/
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page);
                const size = parseInt(req.query.page);
                const resService = yield service.list(page, size);
                return res.status(200).json({ status: 200, msg: "OK", data: resService });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            }
        });
    }
    /**  FIND BY DNI**/
    findByDNI(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { dni } = req.params;
                const resService = yield service.findByDNI(dni);
                if (resService === "INVALID_DNI" || resService === "USER_IS_NOT_PATIENT")
                    return res.status(400).json({ status: 400, msg: resService });
                else if (resService === "PATIENT_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                else
                    return res
                        .status(200)
                        .json({ status: 200, msg: "OK", data: resService });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /**  UPDATE PERSONAL DATA  **/
    updatePD(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                const resService = yield service.updatePD(id, data);
                if (resService === "INVALID_ID")
                    return res.status(400).json({ status: 400, msg: resService });
                else if (resService === "PATIENT_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                else
                    return res.status(201).json({ status: 201, msg: "PATIENT_UPDATED" });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /**  UPDATE SOCIAL NUMBER  **/
    updateSN(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { social_number } = req.body;
                const resService = yield service.updateSN(id, social_number);
                if (resService === "INVALID_ID")
                    return res.status(400).json({ status: 400, msg: resService });
                else if (resService === "PATIENT_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                return res.status(201).json({ status: 201, msg: "PATIENT_UPDATED" });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /**  CHANGE MAIL  **/
    changeMail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { mail } = req.body;
                const resService = yield service.changeMail(id, mail);
                if (resService === "INVALID_ID" ||
                    resService === "MAIL_IN_USE" ||
                    resService === "MAIL_IS_THE_SAME")
                    return res.status(400).json({ status: 400, msg: resService });
                else if (resService === "PATIENT_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                else
                    return res.status(201).json({ status: 201, msg: "PATIENT_UPDATED" });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
}
exports.default = PatientController;
