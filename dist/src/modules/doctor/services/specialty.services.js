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
const uuid_1 = require("uuid");
const specialty_dao_1 = __importDefault(require("../daos/specialty.dao"));
const daoSpecialty = new specialty_dao_1.default();
class SpecialtyService {
    /**  CREATE SPECIALTY  **/
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkName = yield daoSpecialty.findByName(data.name);
            if (checkName)
                return "SPECIALTY_ALREADY_CREATED";
            const id = (0, uuid_1.v4)();
            return yield daoSpecialty.create(Object.assign(Object.assign({}, data), { id }));
        });
    }
    /**  DELETE SPECIALTY  **/
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(id))
                return "INVALID_ID";
            return yield daoSpecialty.delete(id);
        });
    }
}
exports.default = SpecialtyService;
