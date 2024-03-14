"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSaveUserService = void 0;
const SaveUserService_1 = require("./SaveUserService");
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const UserRepository_1 = require("../../../data/repository/user/UserRepository");
const UserValidation_1 = require("../UserValidation");
const EncryptAdapter_1 = require("../../../infra/cryptography/EncryptAdapter");
const makeSaveUserService = () => {
    const validator = (0, UserValidation_1.makeUserValidation)();
    const _salt = parseInt(process.env.SALT);
    const encryptAdapter = new EncryptAdapter_1.EncryptAdapter(_salt);
    const userRepository = new UserRepository_1.PrismaUserRepository(PrismaClient_1.prismaClient.getClient());
    const saveUserService = new SaveUserService_1.SaveUserService(userRepository, validator, encryptAdapter);
    return { saveUserService };
};
exports.makeSaveUserService = makeSaveUserService;
