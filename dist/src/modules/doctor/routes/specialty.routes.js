"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const specialty_controller_1 = __importDefault(require("../controllers/specialty.controller"));
const bodyDoctorValidator_1 = require("../../../middlewares/bodyDoctorValidator");
const requireToken_1 = require("../../../middlewares/requireToken");
const controller = new specialty_controller_1.default();
const SpecialtyRouter = (0, express_1.Router)();
SpecialtyRouter.post("/", requireToken_1.requireToken, bodyDoctorValidator_1.specialtyValidator, controller.create);
SpecialtyRouter.delete("/:id", requireToken_1.requireToken, controller.delete);
exports.default = SpecialtyRouter;
