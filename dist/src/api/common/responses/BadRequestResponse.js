"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestResponse = void 0;
class BadRequestResponse {
    static async handler(response, message) {
        return response.status(400).json({
            message: message
        });
    }
}
exports.BadRequestResponse = BadRequestResponse;
