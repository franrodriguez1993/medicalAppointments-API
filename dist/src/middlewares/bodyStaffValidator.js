"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusValidator = exports.salaryValidator = exports.passwordValidator = exports.usernameValidator = exports.mailValidator = exports.UpdatePDStaffBody = exports.validateLoginBody = exports.validateStaffBody = void 0;
const bodyValidator_1 = require("./bodyValidator");
const express_validator_1 = require("express-validator");
/**  STAFF REGISTER **/
exports.validateStaffBody = [
    (0, express_validator_1.body)("name").trim().isLength({ min: 3, max: 50 }).escape(),
    (0, express_validator_1.body)("lastname").trim().isLength({ min: 3, max: 50 }).escape(),
    (0, express_validator_1.body)("mail").trim().isEmail(),
    (0, express_validator_1.body)("cellphone").trim().isLength({ min: 6, max: 20 }),
    (0, express_validator_1.body)("dni").trim().isLength({ min: 8, max: 9 }).escape(),
    (0, express_validator_1.body)("birthday").trim().isLength({ min: 6, max: 15 }),
    (0, express_validator_1.body)("username").trim().isLength({ min: 3, max: 50 }).escape(),
    (0, express_validator_1.body)("password").trim().isLength({ min: 6, max: 30 }),
    (0, express_validator_1.body)("status").trim().isLength({ min: 3, max: 20 }).escape(),
    (0, express_validator_1.body)("seniority").trim().isLength({ min: 6, max: 15 }),
    (0, express_validator_1.body)("salary").trim().isFloat({ min: 500, max: 9999 }),
    bodyValidator_1.validatorManager,
];
/**  STAFF LOGIN **/
exports.validateLoginBody = [
    (0, express_validator_1.body)("username").trim().isLength({ min: 3, max: 50 }).escape(),
    (0, express_validator_1.body)("password").trim().isLength({ min: 6, max: 30 }),
    bodyValidator_1.validatorManager,
];
/**  STAFF UPDATE  **/
exports.UpdatePDStaffBody = [
    (0, express_validator_1.body)("name").trim().isLength({ min: 3, max: 50 }).escape(),
    (0, express_validator_1.body)("lastname").trim().isLength({ min: 3, max: 50 }).escape(),
    (0, express_validator_1.body)("birthday").trim().isLength({ min: 6, max: 15 }),
    (0, express_validator_1.body)("cellphone").trim().isLength({ min: 6, max: 20 }),
    bodyValidator_1.validatorManager,
];
/** CHECK EMAIL  **/
exports.mailValidator = [(0, express_validator_1.body)("mail").trim().isEmail(), bodyValidator_1.validatorManager];
/** CHECK USERNAME  **/
exports.usernameValidator = [
    (0, express_validator_1.body)("username").trim().isLength({ min: 3, max: 50 }).escape(),
    bodyValidator_1.validatorManager,
];
/** CHECK PASSWORD  **/
exports.passwordValidator = [
    (0, express_validator_1.body)("password").trim().isLength({ min: 6, max: 30 }),
    bodyValidator_1.validatorManager,
];
/** CHECK SALARY  **/
exports.salaryValidator = [
    (0, express_validator_1.body)("salary").trim().isFloat({ min: 500, max: 9999 }),
    bodyValidator_1.validatorManager,
];
exports.statusValidator = [
    (0, express_validator_1.body)("status").trim().isLength({ min: 3, max: 20 }).escape(),
    bodyValidator_1.validatorManager,
];
