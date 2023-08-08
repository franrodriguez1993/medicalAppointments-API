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
const staff_services_1 = __importDefault(require("./staff.services"));
const ResponseEntity_1 = __importDefault(require("../../utils/ResponseEntity"));
class StaffController {
    constructor() {
        /**  REGISTER  **/
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const resService = yield this.service.register(data);
                return res
                    .status(201)
                    .json(new ResponseEntity_1.default(201, "STAFF_REGISTERED", resService));
            }
            catch (e) {
                if (e instanceof Error) {
                    switch (e.message) {
                        case "DNI_IN_USE":
                        case "MAIL_IN_USE":
                        case "USERNAME_IN_USE":
                        case "USER_REGISTERED_WITH_OTHER_MAIL":
                            return res
                                .status(400)
                                .json(new ResponseEntity_1.default(400, e.message, null));
                        case "ERROR_CREATING_STAFF":
                        case "ERROR_CREATING_USER":
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
        /**  LOGIN  **/
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const resService = yield this.service.login(username, password);
                return res
                    .status(200)
                    .json(new ResponseEntity_1.default(200, "LOGIN_SUCCESSFULLY", resService));
            }
            catch (e) {
                if (e instanceof Error) {
                    switch (e.message) {
                        case "INVALID_CREDENTIALS":
                            return res
                                .status(400)
                                .json(new ResponseEntity_1.default(400, e.message, null));
                        default:
                            return res
                                .status(500)
                                .json(new ResponseEntity_1.default(500, e.message, null));
                    }
                }
            }
        });
        /** LIST **/
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
                    .json(new ResponseEntity_1.default(200, "SERVER_ERROR", null));
            }
        });
        /**  UPDATE PERSONAL DATA  **/
        this.updatePersonalData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const { id } = req.params;
                yield this.service.updatePersonalData(id, data);
                return res.status(201).json(new ResponseEntity_1.default(201, "STAFF_UPDATED", id));
            }
            catch (e) {
                if (e instanceof Error) {
                    switch (e.message) {
                        case "STAFF_NOT_FOUND":
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
                                .json(new ResponseEntity_1.default(200, "SERVER_ERROR", null));
                    }
                }
            }
        });
        /** CHANGE MAIL  **/
        this.changeMail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { mail } = req.body;
                const resService = yield this.service.changeMail(id, mail);
                return res
                    .status(200)
                    .json(new ResponseEntity_1.default(200, "MAIL_UPDATED", resService));
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
                        case "STAFF_NOT_FOUND":
                            return res
                                .status(404)
                                .json(new ResponseEntity_1.default(404, e.message, null));
                        default:
                            return res
                                .status(500)
                                .json(new ResponseEntity_1.default(200, "SERVER_ERROR", null));
                    }
                }
            }
        });
        /** CHANGE USERNAME  **/
        this.changeUsername = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.body;
                const { id } = req.params;
                const resService = yield this.service.changeUsername(id, username);
                return res
                    .status(200)
                    .json(new ResponseEntity_1.default(200, "USERNAME_UPDATED", resService));
            }
            catch (e) {
                if (e instanceof Error) {
                    switch (e.message) {
                        case "INVALID_ID":
                        case "USERNAME_IS_THE_SAME":
                        case "USERNAME_ALREADY_IN_USE":
                            return res
                                .status(400)
                                .json(new ResponseEntity_1.default(400, e.message, null));
                        case "STAFF_NOT_FOUND":
                            return res
                                .status(404)
                                .json(new ResponseEntity_1.default(404, e.message, null));
                        default:
                            return res
                                .status(500)
                                .json(new ResponseEntity_1.default(200, "SERVER_ERROR", null));
                    }
                }
            }
        });
        /** CHANGE PASSWORD  **/
        this.changePassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { password } = req.body;
                const { id } = req.params;
                yield this.service.changePassword(id, password);
                return res
                    .status(200)
                    .json(new ResponseEntity_1.default(200, "PASSWORD_UPDATED", null));
            }
            catch (e) {
                if (e instanceof Error) {
                    switch (e.message) {
                        case "INVALID_ID":
                        case "PASSWORD_IS_THE_SAME":
                            return res
                                .status(400)
                                .json(new ResponseEntity_1.default(400, e.message, null));
                        case "STAFF_NOT_FOUND":
                            return res
                                .status(404)
                                .json(new ResponseEntity_1.default(404, e.message, null));
                        default:
                            return res
                                .status(500)
                                .json(new ResponseEntity_1.default(200, "SERVER_ERROR", null));
                    }
                }
            }
        });
        /** FIND BY ID  **/
        this.findByID = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const resService = yield this.service.findByID(id);
                return res.status(200).json(new ResponseEntity_1.default(200, "OK", resService));
            }
            catch (e) {
                if (e instanceof Error) {
                    switch (e.message) {
                        case "INVALID_ID":
                            return res
                                .status(400)
                                .json(new ResponseEntity_1.default(400, e.message, null));
                        case "STAFF_NOT_FOUND":
                            return res
                                .status(404)
                                .json(new ResponseEntity_1.default(404, e.message, null));
                        default:
                            return res
                                .status(500)
                                .json(new ResponseEntity_1.default(200, "SERVER_ERROR", null));
                    }
                }
            }
        });
        /** UPDATE SALARY  **/
        this.updateSalary = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { salary } = req.body;
                const resService = yield this.service.updateSalary(id, salary);
                return res
                    .status(200)
                    .json(new ResponseEntity_1.default(200, "SALARY_UPDATED", resService));
            }
            catch (e) {
                if (e instanceof Error) {
                    switch (e.message) {
                        case "INVALID_ID":
                            return res
                                .status(400)
                                .json(new ResponseEntity_1.default(400, e.message, null));
                        case "STAFF_NOT_FOUND":
                            return res
                                .status(404)
                                .json(new ResponseEntity_1.default(404, e.message, null));
                        default:
                            return res
                                .status(500)
                                .json(new ResponseEntity_1.default(200, "SERVER_ERROR", null));
                    }
                }
            }
        });
        /** UPDATE STATUS  **/
        this.updateStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { status } = req.body;
                const resService = yield this.service.updateStatus(id, status);
                return res
                    .status(200)
                    .json(new ResponseEntity_1.default(200, "STATUS_UPDATED", resService));
            }
            catch (e) {
                if (e instanceof Error) {
                    switch (e.message) {
                        case "INVALID_ID":
                        case "INVALID_STATUS":
                            return res
                                .status(400)
                                .json(new ResponseEntity_1.default(400, e.message, null));
                        case "STAFF_NOT_FOUND":
                            return res
                                .status(404)
                                .json(new ResponseEntity_1.default(404, e.message, null));
                        default:
                            return res
                                .status(500)
                                .json(new ResponseEntity_1.default(200, "SERVER_ERROR", null));
                    }
                }
            }
        });
        this.service = new staff_services_1.default();
    }
}
exports.default = StaffController;
