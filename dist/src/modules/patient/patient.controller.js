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
const ResponseEntity_1 = __importDefault(require("../../utils/ResponseEntity"));
const logger_1 = __importDefault(require("../../utils/logger"));
class PatientController {
    constructor() {
        /**  CREATE  **/
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const resService = yield this.service.create(data);
                return res
                    .status(201)
                    .json({ status: 201, msg: "PATIENT_CREATED", data: resService });
            }
            catch (e) {
                if (e instanceof Error) {
                    logger_1.default.error(e.message);
                    switch (e.message) {
                        case "PATIENT_ALREADY_EXISTS":
                        case "USER_REGISTERED_WITH_ANOTHER_MAIL":
                        case "MAIL_IN_USE":
                        case "SOCIAL_NUMBER_IN_USE":
                            return res
                                .status(400)
                                .json(new ResponseEntity_1.default(400, e.message, null));
                        case "ERROR_CREATING_USER":
                        case "ERROR_CREATING_PATIENT":
                            return res
                                .status(500)
                                .json(new ResponseEntity_1.default(500, e.message, null));
                        default:
                            return res
                                .status(500)
                                .json(new ResponseEntity_1.default(500, "SERVER_ERROR", null));
                    }
                }
            }
        });
        /**  LIST PATIENTS  **/
        this.list = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page);
                const size = parseInt(req.query.page);
                const resService = yield this.service.list(page, size);
                return res.status(200).json(new ResponseEntity_1.default(200, "OK", resService));
            }
            catch (e) {
                return res
                    .status(500)
                    .json(new ResponseEntity_1.default(500, "SERVER_ERROR", null));
            }
        });
        /**  FIND BY DNI**/
        this.findByDNI = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { dni } = req.params;
                const resService = yield this.service.findByDNI(dni);
                return res.status(200).json(new ResponseEntity_1.default(200, "OK", resService));
            }
            catch (e) {
                if (e instanceof Error) {
                    switch (e.message) {
                        case "INVALID_DNI":
                        case "USER_IS_NOT_PATIENT":
                            return res
                                .status(400)
                                .json(new ResponseEntity_1.default(400, e.message, null));
                        case "PATIENT_NOT_FOUND":
                            return res
                                .status(404)
                                .json(new ResponseEntity_1.default(404, e.message, null));
                        default:
                            return res
                                .status(500)
                                .json(new ResponseEntity_1.default(500, "SERVER_ERROR", null));
                    }
                }
            }
        });
        /**  UPDATE PERSONAL DATA  **/
        this.updatePD = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                const resService = yield this.service.updatePD(id, data);
                return res
                    .status(200)
                    .json(new ResponseEntity_1.default(200, "PATIENT_UPDATED", resService));
            }
            catch (e) {
                if (e instanceof Error) {
                    switch (e.message) {
                        case "INVALID_ID":
                            return res
                                .status(400)
                                .json(new ResponseEntity_1.default(400, e.message, null));
                        case "PATIENT_NOT_FOUND":
                            return res
                                .status(404)
                                .json(new ResponseEntity_1.default(404, e.message, null));
                        default:
                            return res
                                .status(500)
                                .json(new ResponseEntity_1.default(500, "SERVER_ERROR", null));
                    }
                }
            }
        });
        /**  UPDATE SOCIAL NUMBER  **/
        this.updateSN = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { social_number } = req.body;
                const resService = yield this.service.updateSN(id, social_number);
                return res
                    .status(200)
                    .json(new ResponseEntity_1.default(200, "PATIENT_UPDATED", resService));
            }
            catch (e) {
                if (e instanceof Error) {
                    switch (e.message) {
                        case "INVALID_ID":
                            return res
                                .status(400)
                                .json(new ResponseEntity_1.default(400, e.message, null));
                        case "PATIENT_NOT_FOUND":
                            return res
                                .status(404)
                                .json(new ResponseEntity_1.default(404, e.message, null));
                        default:
                            return res
                                .status(500)
                                .json(new ResponseEntity_1.default(500, "SERVER_ERROR", null));
                    }
                }
            }
        });
        /**  CHANGE MAIL  **/
        this.changeMail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { mail } = req.body;
                const resService = yield this.service.changeMail(id, mail);
                return res
                    .status(200)
                    .json(new ResponseEntity_1.default(200, "PATIENT_UPDATED", resService));
            }
            catch (e) {
                if (e instanceof Error) {
                    switch (e.message) {
                        case "INVALID_ID":
                        case "MAIL_IN_USE":
                        case "MAIL_IS_THE_SAME":
                            return res
                                .status(400)
                                .json(new ResponseEntity_1.default(400, e.message, null));
                        case "PATIENT_NOT_FOUND":
                            return res
                                .status(404)
                                .json(new ResponseEntity_1.default(404, e.message, null));
                        default:
                            return res
                                .status(500)
                                .json(new ResponseEntity_1.default(500, "SERVER_ERROR", null));
                    }
                }
            }
        });
        this.service = new patient_services_1.default();
    }
}
exports.default = PatientController;
