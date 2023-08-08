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
const ResponseEntity_1 = __importDefault(require("../utils/ResponseEntity"));
const daoStaff = new staff_dao_1.default();
function requireToken(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let token = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            if (!token)
                return res
                    .status(401)
                    .json(new ResponseEntity_1.default(401, "TOKEN_REQUIRED", null));
            token = token.split(" ")[1];
            const checkToken = (0, jwtHandler_1.verifyToken)(token);
            const staff = yield daoStaff.findByID(checkToken.uid);
            if (!staff)
                return res
                    .status(404)
                    .json(new ResponseEntity_1.default(404, "STAFF_NOT_FOUND", null));
            next();
        }
        catch (e) {
            if (e instanceof Error) {
                switch (e.message) {
                    case "invalid signature":
                        return res
                            .status(403)
                            .json(new ResponseEntity_1.default(403, "INVALID_SIGNATURE", null));
                    case "jwt expired":
                        return res
                            .status(403)
                            .json(new ResponseEntity_1.default(403, "JWT_EXPIRED", null));
                    case "invalid token":
                        return res
                            .status(403)
                            .json(new ResponseEntity_1.default(403, "INVALID_TOKEN", null));
                    default:
                        res
                            .status(500)
                            .json(new ResponseEntity_1.default(500, "INTERNAL_SERVER_ERROR", null));
                }
            }
        }
    });
}
exports.requireToken = requireToken;
