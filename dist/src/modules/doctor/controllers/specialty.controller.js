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
const ResponseEntity_1 = __importDefault(require("../../../utils/ResponseEntity"));
class SpecialtyController {
    constructor() {
        /**  CREATE SPECIALTY  **/
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const resService = yield this.service.create(data);
                return res
                    .status(201)
                    .json(new ResponseEntity_1.default(201, "SPECIALTY_CREATED", resService.id));
            }
            catch (e) {
                if (e instanceof Error) {
                    switch (e.message) {
                        case "SPECIALTY_ALREADY_CREATED":
                            return res
                                .status(400)
                                .json(new ResponseEntity_1.default(400, e.message, null));
                        default:
                            return res
                                .status(500)
                                .json(new ResponseEntity_1.default(500, "SERVER_ERROR", null));
                    }
                }
            }
        });
        /**  DELETE SPECIALTY  **/
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.service.delete(id);
                return res
                    .status(200)
                    .json(new ResponseEntity_1.default(200, "SPECIALTY_DELETED", null));
            }
            catch (e) {
                if (e instanceof Error) {
                    switch (e.message) {
                        case "INVALID_ID":
                            return res
                                .status(400)
                                .json(new ResponseEntity_1.default(400, e.message, null));
                        default:
                            return res
                                .status(500)
                                .json(new ResponseEntity_1.default(500, "SERVER_ERROR", null));
                    }
                }
            }
        });
        this.service = new specialty_services_1.default();
    }
}
exports.default = SpecialtyController;
