"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoginService = void 0;
const LoginService_1 = require("./LoginService");
const PrismaClient_1 = require("../../infra/prisma/PrismaClient");
const EncryptAdapter_1 = require("../../infra/cryptography/EncryptAdapter");
const UserRepository_1 = require("../../data/repository/user/UserRepository");
const makeLoginService = () => {
    const _salt = parseInt(process.env.SALT);
    const encryptAdapter = new EncryptAdapter_1.EncryptAdapter(_salt);
    const userRepository = new UserRepository_1.PrismaUserRepository(PrismaClient_1.prismaClient.getClient());
    const loginService = new LoginService_1.LoginService(encryptAdapter, userRepository);
    return { loginService };
};
exports.makeLoginService = makeLoginService;
