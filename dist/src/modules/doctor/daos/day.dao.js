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
const days_model_1 = __importDefault(require("../models/days.model"));
class DayDao {
    /** CREATE **/
    create(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield days_model_1.default.create({ id, name });
            }
            catch (e) {
                if (e instanceof Error) {
                    throw new Error(e.message);
                }
                else
                    throw new Error(e.toString());
            }
        });
    }
    /**  GET BY ID  **/
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield days_model_1.default.findOne({ where: { id } });
            }
            catch (e) {
                if (e instanceof Error) {
                    throw new Error(e.message);
                }
                else
                    throw new Error(e.toString());
            }
        });
    }
    /**  GET BY NAME  **/
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield days_model_1.default.findOne({ where: { name } });
            }
            catch (e) {
                if (e instanceof Error) {
                    throw new Error(e.message);
                }
                else
                    throw new Error(e.toString());
            }
        });
    }
}
exports.default = DayDao;
