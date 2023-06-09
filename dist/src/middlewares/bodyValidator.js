"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorManager = void 0;
const express_validator_1 = require("express-validator");
const validatorManager = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ status: 400, msg: "INVALID_BODY_REQUEST", data: errors.array() });
    }
    next();
};
exports.validatorManager = validatorManager;
