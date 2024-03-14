"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetUsersService = void 0;
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const UserRepository_1 = require("../../../data/repository/user/UserRepository");
const GetUsersService_1 = require("./GetUsersService");
const makeGetUsersService = () => {
    const userRepository = new UserRepository_1.PrismaUserRepository(PrismaClient_1.prismaClient.getClient());
    const getUsersService = new GetUsersService_1.GetUsersService(userRepository);
    return { getUsersService };
};
exports.makeGetUsersService = makeGetUsersService;
