"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentValidator = void 0;
const express_validator_1 = require("express-validator");
const bodyValidator_1 = require("./bodyValidator");
exports.AppointmentValidator = [
    (0, express_validator_1.body)("date").isDate().notEmpty(),
    (0, express_validator_1.body)("id_doctor").notEmpty(),
    (0, express_validator_1.body)("id_staff").notEmpty(),
    (0, express_validator_1.body)("id_patient").notEmpty(),
    (0, express_validator_1.body)("id_day").notEmpty(),
    bodyValidator_1.validatorManager,
];
