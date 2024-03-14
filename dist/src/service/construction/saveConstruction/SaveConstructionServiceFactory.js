"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSaveConstructionService = void 0;
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const ConstructionValidation_1 = require("../ConstructionValidation");
const ConstructionRepository_1 = require("../../../data/repository/construction/ConstructionRepository");
const SaveConstructionService_1 = require("./SaveConstructionService");
const makeSaveConstructionService = () => {
    const validator = (0, ConstructionValidation_1.makeConstructionValidation)();
    const constructionRepository = new ConstructionRepository_1.PrismaConstructionRepository(PrismaClient_1.prismaClient.getClient());
    const saveConstructionService = new SaveConstructionService_1.SaveConstructionService(constructionRepository, validator);
    return { saveConstructionService };
};
exports.makeSaveConstructionService = makeSaveConstructionService;
