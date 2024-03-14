"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateConstructionService = void 0;
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const ConstructionValidation_1 = require("../ConstructionValidation");
const UpdateConstructionService_1 = require("./UpdateConstructionService");
const ConstructionRepository_1 = require("../../../data/repository/construction/ConstructionRepository");
const makeUpdateConstructionService = () => {
    const validator = (0, ConstructionValidation_1.makeConstructionValidation)();
    const constructionRepository = new ConstructionRepository_1.PrismaConstructionRepository(PrismaClient_1.prismaClient.getClient());
    const updateConstructionService = new UpdateConstructionService_1.UpdateConstructionService(constructionRepository, validator);
    return { updateConstructionService };
};
exports.makeUpdateConstructionService = makeUpdateConstructionService;
