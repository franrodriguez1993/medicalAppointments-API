"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseEntity {
    constructor(status, msg, data) {
        this.status = status;
        this.msg = msg;
        this.data = data;
    }
}
exports.default = ResponseEntity;
