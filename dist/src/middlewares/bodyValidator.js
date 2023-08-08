"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorManager = void 0;
const express_validator_1 = require("express-validator");
const ResponseEntity_1 = __importDefault(require("../utils/ResponseEntity"));
const validatorManager = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(new ResponseEntity_1.default(400, "INVALID_BODY_REQUEST", errors.array()));
    }
    next();
};
exports.validatorManager = validatorManager;
