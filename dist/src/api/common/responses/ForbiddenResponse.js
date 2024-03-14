"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenResponse = void 0;
class ForbiddenResponse {
    static async handler(response, message) {
        return response.status(403).json({
            message: message
        });
    }
}
exports.ForbiddenResponse = ForbiddenResponse;
