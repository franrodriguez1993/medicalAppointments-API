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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEncrypt = exports.encrypt = void 0;
const bcryptjs_1 = require("bcryptjs");
//Encript password:
const encrypt = (pass) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, bcryptjs_1.hash)(pass, 8);
});
exports.encrypt = encrypt;
//check password:
const verifyEncrypt = (pass, hashPash) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, bcryptjs_1.compare)(pass, hashPash);
});
exports.verifyEncrypt = verifyEncrypt;
