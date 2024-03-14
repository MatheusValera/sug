"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetAllocationsService = void 0;
const AllocationRepository_1 = require("../../../data/repository/allocation/AllocationRepository");
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const GetAllocationsService_1 = require("./GetAllocationsService");
const makeGetAllocationsService = () => {
    const repository = new AllocationRepository_1.PrismaAllocationRepository(PrismaClient_1.prismaClient.getClient());
    const getAllocationsService = new GetAllocationsService_1.GetAllocationsService(repository);
    return { getAllocationsService };
};
exports.makeGetAllocationsService = makeGetAllocationsService;
