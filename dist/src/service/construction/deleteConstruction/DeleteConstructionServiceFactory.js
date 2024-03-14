"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteConstructionService = void 0;
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const DeleteConstructionService_1 = require("./DeleteConstructionService");
const ConstructionRepository_1 = require("../../../data/repository/construction/ConstructionRepository");
const makeDeleteConstructionService = () => {
    const constructionRepository = new ConstructionRepository_1.PrismaConstructionRepository(PrismaClient_1.prismaClient.getClient());
    const deleteConstructionService = new DeleteConstructionService_1.DeleteConstructionService(constructionRepository);
    return { deleteConstructionService };
};
exports.makeDeleteConstructionService = makeDeleteConstructionService;
