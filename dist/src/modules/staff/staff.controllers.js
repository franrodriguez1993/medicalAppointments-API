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
const logger_1 = __importDefault(require("../../utils/logger"));
const service = new staff_services_1.default();
class StaffController {
    /**  REGISTER  **/
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const resService = yield service.register(data);
                if (resService === "MAIL_IN_USE" ||
                    resService === "USERNAME_IN_USE" ||
                    resService === "DNI_IN_USE" ||
                    resService === "USER_REGISTERED_WITH_OTHER_MAIL")
                    return res.status(400).json({ status: 400, msg: resService });
                else if (resService === "ERROR_CREATING_STAFF" ||
                    resService === "ERROR_CREATING_USER")
                    return res.status(500).json({ status: 500, msg: resService });
                else
                    return res
                        .status(201)
                        .json({ status: 201, msg: "STAFF_REGISTERED", data: resService });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            }
        });
    }
    /**  LOGIN  **/
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const resService = yield service.login(username, password);
                if (resService === "INVALID_CREDENTIALS")
                    return res.status(400).json({ status: 400, msg: resService });
                return res
                    .status(200)
                    .json({ status: 200, msg: "LOGIN_SUCCESSFULLY", data: resService });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            }
        });
    }
    /** LIST **/
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
    /**  UPDATE PERSONAL DATA  **/
    updatePersonalData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const { id } = req.params;
                const resService = yield service.updatePersonalData(id, data);
                if (resService === "STAFF_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                else if (resService === "INVALID_ID")
                    return res.status(400).json({ status: 400, msg: resService });
                return res.status(201).json({ status: 201, msg: "STAFF_UPDATED" });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            }
        });
    }
    /** CHANGE MAIL  **/
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
                else if (resService === "STAFF_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                return res.status(201).json({ status: 201, msg: "MAIL_UPDATED" });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            }
        });
    }
    /** CHANGE USERNAME  **/
    changeUsername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.body;
                const { id } = req.params;
                const resService = yield service.changeUsername(id, username);
                if (resService === "INVALID_ID" ||
                    resService === "USERNAME_IS_THE_SAME" ||
                    resService === "USERNAME_ALREADY_IN_USE")
                    return res.status(400).json({ status: 400, msg: resService });
                else if (resService === "STAFF_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                else
                    return res.status(201).json({ status: 201, msg: "USERNAME_UPDATED" });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            }
        });
    }
    /** CHANGE PASSWORD  **/
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password } = req.body;
                const { id } = req.params;
                const resService = yield service.changePassword(id, password);
                if (resService === "INVALID_ID" || resService === "PASSWORD_IS_THE_SAME")
                    return res.status(400).json({ status: 400, msg: resService });
                else if (resService === "STAFF_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                else
                    return res.status(201).json({ status: 201, msg: "PASSWORD_UPDATED" });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            }
        });
    }
    /** FIND BY ID  **/
    findByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const resService = yield service.findByID(id);
                if (resService === "INVALID_ID")
                    return res.status(400).json({ status: 400, msg: resService });
                else if (resService === "STAFF_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                return res.status(200).json({ status: 200, msg: "OK", data: resService });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            }
        });
    }
    /** UPDATE SALARY  **/
    updateSalary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { salary } = req.body;
                const resService = yield service.updateSalary(id, salary);
                if (resService === "INVALID_ID")
                    return res.status(400).json({ status: 400, msg: resService });
                else if (resService === "STAFF_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                return res.status(201).json({ status: 201, msg: "SALARY_UPDATED" });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            }
        });
    }
    /** UPDATE STATUS  **/
    updateStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { status } = req.body;
                const resService = yield service.updateStatus(id, status);
                if (resService === "INVALID_ID" || resService === "INVALID_STATUS")
                    return res.status(400).json({ status: 400, msg: resService });
                else if (resService === "STAFF_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                return res.status(201).json({ status: 201, msg: "STATUS_UPDATED" });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            }
        });
    }
}
exports.default = StaffController;
