"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = void 0;
class SuccessResponse {
    static async handler(response, body) {
        return response.status(200).json(body);
    }
}
exports.SuccessResponse = SuccessResponse;
