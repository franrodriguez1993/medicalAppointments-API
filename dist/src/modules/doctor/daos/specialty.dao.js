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
const specialties_model_1 = __importDefault(require("../models/specialties.model"));
class SpecialtyDao {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield specialties_model_1.default.create(data);
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield specialties_model_1.default.findOne({ where: { name } });
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield specialties_model_1.default.findOne({ where: { id } });
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield specialties_model_1.default.destroy({ where: { id } });
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield specialties_model_1.default.destroy({ where: {} });
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
}
exports.default = SpecialtyDao;
