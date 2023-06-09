"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleValidator = exports.doctorBodyUpdateValidator = exports.doctorBodyValidator = exports.specialtyValidator = void 0;
const bodyValidator_1 = require("./bodyValidator");
const express_validator_1 = require("express-validator");
/** BODY SPECIALTY **/
exports.specialtyValidator = [
    (0, express_validator_1.body)("name").trim().isString().isLength({ min: 3, max: 20 }).escape(),
    bodyValidator_1.validatorManager,
];
/**  BODY DOCTOR **/
/**  STAFF REGISTER **/
exports.doctorBodyValidator = [
    (0, express_validator_1.body)("name").trim().isLength({ min: 3, max: 50 }).escape(),
    (0, express_validator_1.body)("lastname").trim().isLength({ min: 3, max: 50 }).escape(),
    (0, express_validator_1.body)("mail").trim().isEmail(),
    (0, express_validator_1.body)("cellphone").trim().isLength({ min: 6, max: 20 }),
    (0, express_validator_1.body)("dni").trim().isLength({ min: 8, max: 9 }).escape(),
    (0, express_validator_1.body)("birthday").trim().isLength({ min: 6, max: 15 }),
    (0, express_validator_1.body)("id_specialty").optional().trim().isString().isLength({ max: 50 }),
    bodyValidator_1.validatorManager,
];
/**  UPDATE DATA   **/
exports.doctorBodyUpdateValidator = [
    (0, express_validator_1.body)("name").trim().isLength({ min: 3, max: 50 }).escape(),
    (0, express_validator_1.body)("lastname").trim().isLength({ min: 3, max: 50 }).escape(),
    (0, express_validator_1.body)("birthday").trim().isLength({ min: 6, max: 15 }),
    (0, express_validator_1.body)("cellphone").trim().isLength({ min: 6, max: 20 }),
    bodyValidator_1.validatorManager,
];
/**  CREATE SCHEDULE  **/
exports.scheduleValidator = [
    (0, express_validator_1.body)("day").trim().isString().isLength({ min: 6, max: 15 }).escape(),
    (0, express_validator_1.body)("hourIn").trim().isTime({ hourFormat: "hour24", mode: "withSeconds" }),
    (0, express_validator_1.body)("hourOut").trim().isTime({ hourFormat: "hour24", mode: "withSeconds" }),
    bodyValidator_1.validatorManager,
];
