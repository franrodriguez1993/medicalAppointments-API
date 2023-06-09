"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const staff_controllers_1 = __importDefault(require("./staff.controllers"));
const bodyStaffValidator_1 = require("../../middlewares/bodyStaffValidator");
const requireToken_1 = require("../../middlewares/requireToken");
const controller = new staff_controllers_1.default();
const staffRouter = (0, express_1.Router)();
staffRouter.post("/register", bodyStaffValidator_1.validateStaffBody, controller.register);
staffRouter.post("/login", bodyStaffValidator_1.validateLoginBody, controller.login);
staffRouter.put("/:id/personal", bodyStaffValidator_1.UpdatePDStaffBody, controller.updatePersonalData);
staffRouter.get("/", requireToken_1.requireToken, controller.list);
staffRouter.put("/:id/mail", bodyStaffValidator_1.mailValidator, controller.changeMail);
staffRouter.put("/:id/username", requireToken_1.requireToken, bodyStaffValidator_1.usernameValidator, controller.changeUsername);
staffRouter.put("/:id/password", requireToken_1.requireToken, bodyStaffValidator_1.passwordValidator, controller.changePassword);
staffRouter.put("/:id/salary", requireToken_1.requireToken, bodyStaffValidator_1.salaryValidator, controller.updateSalary);
staffRouter.put("/:id/status", requireToken_1.requireToken, bodyStaffValidator_1.statusValidator, controller.updateStatus);
staffRouter.get("/:id", requireToken_1.requireToken, controller.findByID);
exports.default = staffRouter;
