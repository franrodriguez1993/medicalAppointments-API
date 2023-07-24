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
const doctor_services_1 = __importDefault(require("../services/doctor.services"));
const logger_1 = __importDefault(require("../../../utils/logger"));
const service = new doctor_services_1.default();
class DoctorController {
    /**  CREATE  **/
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const resService = yield service.create(data);
                if (resService === "USER_REGISTERED_WITH_OTHER_MAIL" ||
                    resService === "DOCTOR_ALREADY_REGISTERED" ||
                    resService === "INVALID_ID")
                    return res.status(400).json({ status: 400, msg: resService });
                else if (resService === "ERROR_CREATING_DOCTOR" ||
                    resService === "ERROR_CREATING_USER")
                    return res.status(500).json({ status: 500, msg: resService });
                else if (resService === "SPECIALTY_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                else
                    return res
                        .status(201)
                        .json({ status: 201, msg: "DOCTOR_REGISTERED", data: resService });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            }
        });
    }
    /** LIST DOCTORS **/
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
    /**  FIND BY ID  **/
    findByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const resService = yield service.findByID(id);
                if (resService === "DOCTOR_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                else if (resService === "INVALID_ID")
                    return res.status(400).json({ status: 400, msg: resService });
                else
                    return res
                        .status(200)
                        .json({ status: 200, msg: "OK", data: resService });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            }
        });
    }
    /**  UPDATE DATA  **/
    updateData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                const resService = yield service.updateData(id, data);
                if (resService === "DOCTOR_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                else if (resService === "INVALID_ID")
                    return res.status(400).json({ status: 400, msg: resService });
                return res.status(201).json({ status: 201, msg: "DOCTOR_UPDATED" });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            }
        });
    }
    /**  UPDATE MAIL   **/
    updateMail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const mail = req.body.mail;
                const resService = yield service.updateMail(id, mail);
                if (resService === "DOCTOR_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                else if (resService === "INVALID_ID" ||
                    resService === "MAIL_IN_USE" ||
                    resService === "MAIL_IS_THE_SAME")
                    return res.status(400).json({ status: 400, msg: resService });
                return res.status(201).json({ status: 201, msg: "DOCTOR_UPDATED" });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            }
        });
    }
    /**  UPDATE SPECIALTY   **/
    updateSpecialty(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { id_specialty } = req.body;
                const resService = yield service.updateSpecialty(id, id_specialty);
                if (resService === "INVALID_ID")
                    return res.status(400).json({ status: 400, msg: resService });
                else if (resService === "DOCTOR_NOT_FOUND" ||
                    resService === "SPECIALTY_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                else
                    return res.status(201).json({ status: 201, msg: "DOCTOR_UPDATED" });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            }
        });
    }
    /**  ADD SCHEDULE **/
    addSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const { id } = req.params;
                const resService = yield service.addSchedule(Object.assign(Object.assign({}, data), { id_doctor: id }));
                if (resService === "INVALID_ID" ||
                    resService === "SCHEDULE_ALREADY_EXISTS")
                    return res.status(400).json({ status: 400, msg: resService });
                else if (resService === "DAY_NOT_FOUND" ||
                    resService === "DOCTOR_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                else
                    return res.status(201).json({ status: 201, msg: "SCHEDULE_ADDED" });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            }
        });
    }
    /**  UPDATE SCHEDULE **/
    updateSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const { id } = req.params;
                const resService = yield service.updateSchedule(Object.assign(Object.assign({}, data), { id_doctor: id }));
                if (resService === "INVALID_ID")
                    return res.status(400).json({ status: 400, msg: resService });
                else if (resService === "DAY_NOT_FOUND" ||
                    resService === "DOCTOR_NOT_FOUND" ||
                    resService === "SCHEDULE_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                else
                    return res.status(201).json({ status: 201, msg: "SCHEDULE_UPDATED" });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            }
        });
    }
    /**  DELETE SCHEDULE **/
    deleteSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, day } = req.params;
                const resService = yield service.deleteSchedule(id, day);
                if (resService === "INVALID_ID")
                    return res.status(400).json({ status: 400, msg: resService });
                else if (resService === "DAY_NOT_FOUND" ||
                    resService === "DOCTOR_NOT_FOUND" ||
                    resService === "SCHEDULE_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                else
                    return res.status(201).json({ status: 200, msg: "SCHEDULE_DELETED" });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            }
        });
    }
}
exports.default = DoctorController;
