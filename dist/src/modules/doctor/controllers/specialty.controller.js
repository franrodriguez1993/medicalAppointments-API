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
const specialty_services_1 = __importDefault(require("../services/specialty.services"));
const logger_1 = __importDefault(require("../../../utils/logger"));
const service = new specialty_services_1.default();
class SpecialtyController {
    /**  CREATE SPECIALTY  **/
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const resService = yield service.create(data);
                if (resService === "SPECIALTY_ALREADY_CREATED")
                    return res.status(400).json({ status: 400, msg: resService });
                else
                    return res
                        .status(201)
                        .json({ status: 201, msg: "SPECIALTY_CREATED", data: resService.id });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            }
        });
    }
    /**  DELETE SPECIALTY  **/
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const resService = yield service.delete(id);
                if (resService === "INVALID_ID")
                    return res.status(400).json({ status: 400, msg: resService });
                else
                    return res.status(200).json({ status: 200, msg: "SPECIALTY_DELETED" });
            }
            catch (e) {
                logger_1.default.error(e);
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            }
        });
    }
}
exports.default = SpecialtyController;
