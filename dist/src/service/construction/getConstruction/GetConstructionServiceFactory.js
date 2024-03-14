"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetConstructionService = void 0;
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const GetConstructionService_1 = require("./GetConstructionService");
const ConstructionRepository_1 = require("../../../data/repository/construction/ConstructionRepository");
const makeGetConstructionService = () => {
    const constructionRepository = new ConstructionRepository_1.PrismaConstructionRepository(PrismaClient_1.prismaClient.getClient());
    const getConstructionService = new GetConstructionService_1.GetConstructionService(constructionRepository);
    return { getConstructionService };
};
exports.makeGetConstructionService = makeGetConstructionService;
