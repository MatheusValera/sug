"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaPermissionsUserRepository = void 0;
class PrismaPermissionsUserRepository {
    constructor(_prismaClient) {
        this._prismaClient = _prismaClient;
    }
    async insertPermissionToUser(permissionsUser) {
        const existingPermissionsUser = await this._prismaClient.permissionsUser.findFirst({
            where: {
                permissionId: permissionsUser.permissionId,
                userId: permissionsUser.userId
            }
        });
        if (existingPermissionsUser) {
            throw new Error('[ENTITY- PERMISSIONS_USER]: Relação de permissões de usuário já existe');
        }
        const register = this._prismaClient.permissionsUser.create({
            data: permissionsUser
        });
        return register;
    }
    async updatePermissionToUser(permissionsUserId, updatedData) {
        const existingPermissionsUser = await this._prismaClient.permissionsUser.findUnique({
            where: { id: permissionsUserId }
        });
        if (!existingPermissionsUser) {
            throw new Error('[ENTITY- PERMISSIONS_USER]: Relação de permissões de usuário não encontrada');
        }
        const register = this._prismaClient.permissionsUser.update({
            where: { id: permissionsUserId },
            data: updatedData
        });
        return register;
    }
    async getPermissionToUserByUserId(userId) {
        const register = this._prismaClient.permissionsUser.findMany({
            where: { userId }
        });
        return register;
    }
    async deletePermissionToUser(permissionsUserId) {
        const existingPermissionsUser = await this._prismaClient.permissionsUser.findUnique({
            where: { id: permissionsUserId }
        });
        if (!existingPermissionsUser) {
            throw new Error('[ENTITY- PERMISSIONS_USER]: Relação de permissões de usuário não encontrada');
        }
        const register = this._prismaClient.permissionsUser.delete({
            where: { id: permissionsUserId }
        });
        return register;
    }
}
exports.PrismaPermissionsUserRepository = PrismaPermissionsUserRepository;
