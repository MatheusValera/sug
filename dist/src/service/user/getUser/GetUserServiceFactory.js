"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetUserService = void 0;
const GetUserService_1 = require("./GetUserService");
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const UserRepository_1 = require("../../../data/repository/user/UserRepository");
const makeGetUserService = () => {
    const userRepository = new UserRepository_1.PrismaUserRepository(PrismaClient_1.prismaClient.getClient());
    const getUserService = new GetUserService_1.GetUserService(userRepository);
    return { getUserService };
};
exports.makeGetUserService = makeGetUserService;
