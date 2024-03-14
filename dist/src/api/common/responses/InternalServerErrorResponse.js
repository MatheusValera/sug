"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerErrorResponse = void 0;
class InternalServerErrorResponse {
    static async handler(response, message) {
        return response.status(500).json({
            message: message
        });
    }
}
exports.InternalServerErrorResponse = InternalServerErrorResponse;
