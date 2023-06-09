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
exports.requireToken = void 0;
const jwtHandler_1 = require("../utils/jwtHandler");
const staff_dao_1 = __importDefault(require("../modules/staff/staff.dao"));
const logger_1 = __importDefault(require("../utils/logger"));
const daoStaff = new staff_dao_1.default();
function requireToken(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let token = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            if (!token)
                return res.status(401).json({ status: 401, msg: "TOKEN_REQUIRED" });
            token = token.split(" ")[1];
            const checkToken = (0, jwtHandler_1.verifyToken)(token);
            const staff = yield daoStaff.findByID(checkToken.uid);
            if (!staff)
                return res.status(404).json({ status: 404, msg: "STAFF_NOT_FOUND" });
            next();
        }
        catch (e) {
            if (e.message === "invalid signature")
                return res.json({ status: 403, message: "INVALID_SIGNATURE" });
            else if (e.message === "jwt expired")
                return res.json({ status: 403, message: "JWT_EXPIRED" });
            else if (e.message === "invalid token")
                return res.json({ status: 403, message: "INVALID_TOKEN" });
            else {
                logger_1.default.error(e.message);
                return res.json({ status: 500, message: "INTERNAL_SERVER_ERROR" });
            }
        }
    });
}
exports.requireToken = requireToken;
