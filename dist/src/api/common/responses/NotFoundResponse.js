"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundResponse = void 0;
class NotFoundResponse {
    static async handler(response, message) {
        return response.status(404).json({
            message: message
        });
    }
}
exports.NotFoundResponse = NotFoundResponse;
