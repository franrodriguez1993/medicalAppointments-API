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
const ResponseEntity_1 = __importDefault(require("../../../utils/ResponseEntity"));
class DoctorController {
    constructor() {
        /**  CREATE  **/
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const resService = yield this.service.create(data);
                return res
                    .status(201)
                    .json(new ResponseEntity_1.default(201, "DOCTOR_REGISTERED", resService));
            }
            catch (e) {
                if (e instanceof Error) {
                    switch (e.message) {
                        case "USER_REGISTERED_WITH_OTHER_MAIL":
                        case "DOCTOR_ALREADY_REGISTERED":
                        case "INVALID_ID":
                            return res
                                .status(400)
                                .json(new ResponseEntity_1.default(400, e.message, null));
                        case "ERROR_CREATING_DOCTOR":
                        case "ERROR_CREATING_USER":
                            return res
                                .status(500)
                                .json(new ResponseEntity_1.default(500, e.message, null));
                        case "SPECIALTY_NOT_FOUND":
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
        /** LIST DOCTORS **/
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
        /**  FIND BY ID  **/
        this.findByID = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const resService = yield this.service.findByID(id);
                return res.status(200).json(new ResponseEntity_1.default(200, "OK", resService));
            }
            catch (e) {
                if (e instanceof Error) {
                    switch (e.message) {
                        case "DOCTOR_NOT_FOUND":
                            return res
                                .status(404)
                                .json(new ResponseEntity_1.default(404, e.message, null));
                        case "INVALID_ID":
                            return res
                                .status(400)
                                .json(new ResponseEntity_1.default(400, e.message, null));
                        default:
                            return res
                                .status(500)
                                .json(new ResponseEntity_1.default(500, "SERVER_ERROR", null));
                    }
                }
            }
        });
        /**  UPDATE DATA  **/
        this.updateData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                const resService = yield this.service.updateData(id, data);
                return res
                    .status(200)
                    .json(new ResponseEntity_1.default(200, "DOCTOR_UPDATED", resService));
            }
            catch (e) {
                if (e instanceof Error) {
                    switch (e.message) {
                        case "DOCTOR_NOT_FOUND":
                            return res
                                .status(404)
                                .json(new ResponseEntity_1.default(404, e.message, null));
                        case "INVALID_ID":
                            return res
                                .status(400)
                                .json(new ResponseEntity_1.default(400, e.message, null));
                        default:
                            return res
                                .status(500)
                                .json(new ResponseEntity_1.default(500, "SERVER_ERROR", null));
                    }
                }
            }
        });
        /**  UPDATE MAIL   **/
        this.updateMail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const mail = req.body.mail;
                const resService = yield this.service.updateMail(id, mail);
                return res
                    .status(200)
                    .json(new ResponseEntity_1.default(200, "DOCTOR_UPDATED", resService));
            }
            catch (e) {
                if (e instanceof Error) {
                    switch (e.message) {
                        case "DOCTOR_NOT_FOUND":
                            return res
                                .status(404)
                                .json(new ResponseEntity_1.default(404, e.message, null));
                        case "INVALID_ID":
                        case "MAIL_IN_USE":
                        case "MAIL_IS_THE_SAME":
                            return res
                                .status(400)
                                .json(new ResponseEntity_1.default(400, e.message, null));
                        default:
                            return res
                                .status(500)
                                .json(new ResponseEntity_1.default(500, "SERVER_ERROR", null));
                    }
                }
            }
        });
        /**  UPDATE SPECIALTY   **/
        this.updateSpecialty = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { id_specialty } = req.body;
                const resService = yield this.service.updateSpecialty(id, id_specialty);
                return res
                    .status(200)
                    .json(new ResponseEntity_1.default(200, "DOCTOR_UPDATED", resService));
            }
            catch (e) {
                if (e instanceof Error) {
                    switch (e.message) {
                        case "DOCTOR_NOT_FOUND":
                        case "SPECIALTY_NOT_FOUND":
                            return res
                                .status(404)
                                .json(new ResponseEntity_1.default(404, e.message, null));
                        case "INVALID_ID":
                            return res
                                .status(400)
                                .json(new ResponseEntity_1.default(400, e.message, null));
                        default:
                            return res
                                .status(500)
                                .json(new ResponseEntity_1.default(500, "SERVER_ERROR", null));
                    }
                }
            }
        });
        /**  ADD SCHEDULE **/
        this.addSchedule = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const { id } = req.params;
                yield this.service.addSchedule(Object.assign(Object.assign({}, data), { id_doctor: id }));
                return res
                    .status(201)
                    .json(new ResponseEntity_1.default(201, "SCHEDULE_ADDED", null));
            }
            catch (e) {
                if (e instanceof Error) {
                    switch (e.message) {
                        case "DOCTOR_NOT_FOUND":
                        case "DAY_NOT_FOUND":
                            return res
                                .status(404)
                                .json(new ResponseEntity_1.default(404, e.message, null));
                        case "INVALID_ID":
                        case "SCHEDULE_ALREADY_EXISTS":
                            return res
                                .status(400)
                                .json(new ResponseEntity_1.default(400, e.message, null));
                        default:
                            return res
                                .status(500)
                                .json(new ResponseEntity_1.default(500, "SERVER_ERROR", null));
                    }
                }
            }
        });
        /**  UPDATE SCHEDULE **/
        this.updateSchedule = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const { id } = req.params;
                yield this.service.updateSchedule(Object.assign(Object.assign({}, data), { id_doctor: id }));
                return res
                    .status(200)
                    .json(new ResponseEntity_1.default(200, "SCHEDULE_UPDATED", null));
            }
            catch (e) {
                if (e instanceof Error) {
                    switch (e.message) {
                        case "DOCTOR_NOT_FOUND":
                        case "DAY_NOT_FOUND":
                        case "SCHEDULE_NOT_FOUND":
                            return res
                                .status(404)
                                .json(new ResponseEntity_1.default(404, e.message, null));
                        case "INVALID_ID":
                            return res
                                .status(400)
                                .json(new ResponseEntity_1.default(400, e.message, null));
                        default:
                            return res
                                .status(500)
                                .json(new ResponseEntity_1.default(500, "SERVER_ERROR", null));
                    }
                }
            }
        });
        /**  DELETE SCHEDULE **/
        this.deleteSchedule = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, day } = req.params;
                yield this.service.deleteSchedule(id, day);
                return res
                    .status(201)
                    .json(new ResponseEntity_1.default(200, "SCHEDULE_DELETED", null));
            }
            catch (e) {
                if (e instanceof Error) {
                    switch (e.message) {
                        case "DOCTOR_NOT_FOUND":
                        case "DAY_NOT_FOUND":
                        case "SCHEDULE_NOT_FOUND":
                            return res
                                .status(404)
                                .json(new ResponseEntity_1.default(404, e.message, null));
                        case "INVALID_ID":
                            return res
                                .status(400)
                                .json(new ResponseEntity_1.default(400, e.message, null));
                        default:
                            return res
                                .status(500)
                                .json(new ResponseEntity_1.default(500, "SERVER_ERROR", null));
                    }
                }
            }
        });
        this.service = new doctor_services_1.default();
    }
}
exports.default = DoctorController;
