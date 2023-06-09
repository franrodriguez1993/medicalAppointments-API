"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SNValidator = exports.personalDataValidator = exports.patientValidator = void 0;
const express_validator_1 = require("express-validator");
const bodyValidator_1 = require("./bodyValidator");
/**  PATIENT VALIDATOR  **/
exports.patientValidator = [
    (0, express_validator_1.body)("name").trim().isLength({ min: 3, max: 50 }).escape(),
    (0, express_validator_1.body)("lastname").trim().isLength({ min: 3, max: 50 }).escape(),
    (0, express_validator_1.body)("mail").trim().isEmail(),
    (0, express_validator_1.body)("cellphone").trim().isLength({ min: 6, max: 20 }),
    (0, express_validator_1.body)("dni").trim().isLength({ min: 8, max: 9 }).escape(),
    (0, express_validator_1.body)("birthday").trim().isLength({ min: 6, max: 15 }),
    (0, express_validator_1.body)("social_number").trim().isString().isLength({ min: 10, max: 25 }),
    bodyValidator_1.validatorManager,
];
/**  PATIENT UPDATE  **/
exports.personalDataValidator = [
    (0, express_validator_1.body)("name").trim().isLength({ min: 3, max: 50 }).escape(),
    (0, express_validator_1.body)("lastname").trim().isLength({ min: 3, max: 50 }).escape(),
    (0, express_validator_1.body)("birthday").trim().isLength({ min: 6, max: 15 }),
    (0, express_validator_1.body)("cellphone").trim().isLength({ min: 6, max: 20 }),
    bodyValidator_1.validatorManager,
];
/**  CHECK SOCIALNUMBER  **/
exports.SNValidator = [
    (0, express_validator_1.body)("social_number").trim().isString().isLength({ min: 10, max: 25 }),
    bodyValidator_1.validatorManager,
];
