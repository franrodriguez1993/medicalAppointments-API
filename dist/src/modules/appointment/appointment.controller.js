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
const appointment_services_1 = __importDefault(require("./appointment.services"));
const logger_1 = __importDefault(require("../../utils/logger"));
const service = new appointment_services_1.default();
class AppointmentController {
    /**  CREATE  **/
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const resService = yield service.create(data);
                if (resService === "DAY_NOT_FOUND" ||
                    resService === "DOCTOR_NOT_FOUND" ||
                    resService === "PATIENT_NOT_FOUND" ||
                    resService === "STAFF_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                else if (resService === "APPOINTMENT_ALREADY_EXISTS" ||
                    resService === "INVALID ID" ||
                    resService === "INVALID_DOCTOR_SCHEDULE" ||
                    resService === "MAXIMUM_APPOINTMENTS")
                    return res.status(400).json({ status: 400, msg: resService });
                else
                    return res.status(201).json({
                        status: 201,
                        msg: "APPOINTMENT_CREATED",
                        data: resService.id,
                    });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            }
        });
    }
    /**  LIST APPOINTMENT  **/
    listAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { date } = req.query;
                const resService = yield service.listAppointment(id, date.toString());
                if (resService === "INVALID_ID")
                    return res.status(400).json({ status: 400, msg: resService });
                else if (resService === "DOCTOR_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                return res.status(200).json({ status: 200, msg: "OK", data: resService });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            }
        });
    }
    /**   DELETE APPOINTMENT **/
    deleteOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const resService = yield service.deleteOne(id);
                if (resService === "INVALID_ID")
                    return res.status(400).json({ status: 400, msg: resService });
                else
                    return res
                        .status(200)
                        .json({ status: 200, msg: "APPOINTMENT_DELETED" });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            }
        });
    }
}
exports.default = AppointmentController;
