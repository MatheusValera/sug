"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetConstructionsService = void 0;
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const GetConstructionsService_1 = require("./GetConstructionsService");
const ConstructionRepository_1 = require("../../../data/repository/construction/ConstructionRepository");
const makeGetConstructionsService = () => {
    const constructionRepository = new ConstructionRepository_1.PrismaConstructionRepository(PrismaClient_1.prismaClient.getClient());
    const getConstructionsService = new GetConstructionsService_1.GetConstructionsService(constructionRepository);
    return { getConstructionsService };
};
exports.makeGetConstructionsService = makeGetConstructionsService;
