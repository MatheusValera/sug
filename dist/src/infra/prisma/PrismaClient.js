"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const client_1 = require("@prisma/client");
exports.prismaClient = {
    _prismaClient: null,
    getClient() {
        if (!this._prismaClient) {
            this._prismaClient = new client_1.PrismaClient();
        }
        return this._prismaClient;
    }
};
