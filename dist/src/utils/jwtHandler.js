"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const configServer_1 = __importDefault(require("../config/configServer"));
const JWT_SECRET = configServer_1.default.server.jwt_secret;
const JWT_EXPIRATION = configServer_1.default.server.jwt_expiration;
//Generate token:
const generateToken = (uid) => {
    return (0, jsonwebtoken_1.sign)({ uid }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};
exports.generateToken = generateToken;
//Validate token:
const verifyToken = (jwt) => {
    return (0, jsonwebtoken_1.verify)(jwt, JWT_SECRET);
};
exports.verifyToken = verifyToken;
