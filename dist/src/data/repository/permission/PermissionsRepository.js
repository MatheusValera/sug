"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaPermissionRepository = void 0;
class PrismaPermissionRepository {
    constructor(_prismaClient) {
        this._prismaClient = _prismaClient;
    }
    async get(permissionId) {
        return this._prismaClient.permission.findUnique({
            where: { id: permissionId }
        });
    }
}
exports.PrismaPermissionRepository = PrismaPermissionRepository;
