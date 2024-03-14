"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateUserService = void 0;
const UserValidation_1 = require("../UserValidation");
const UpdateUserService_1 = require("./UpdateUserService");
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const EncryptAdapter_1 = require("../../../infra/cryptography/EncryptAdapter");
const UserRepository_1 = require("../../../data/repository/user/UserRepository");
const makeUpdateUserService = () => {
    const validator = (0, UserValidation_1.makeUserValidation)();
    const _salt = parseInt(process.env.SALT);
    const encryptAdapter = new EncryptAdapter_1.EncryptAdapter(_salt);
    const userRepository = new UserRepository_1.PrismaUserRepository(PrismaClient_1.prismaClient.getClient());
    const updateUserService = new UpdateUserService_1.UpdateUserService(userRepository, validator, encryptAdapter);
    return { updateUserService };
};
exports.makeUpdateUserService = makeUpdateUserService;
