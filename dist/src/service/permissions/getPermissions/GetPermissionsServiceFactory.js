"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetPermissionsService = void 0;
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const GetPermissionsService_1 = require("./GetPermissionsService");
const UserPermissionsRepository_1 = require("../../../data/repository/user/permissions/UserPermissionsRepository");
const makeGetPermissionsService = () => {
    const permissionsRepository = new UserPermissionsRepository_1.PrismaPermissionsUserRepository(PrismaClient_1.prismaClient.getClient());
    const getPermissionsService = new GetPermissionsService_1.GetPermissionsService(permissionsRepository);
    return { getPermissionsService };
};
exports.makeGetPermissionsService = makeGetPermissionsService;
