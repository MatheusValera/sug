"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetAllocationService = void 0;
const AllocationRepository_1 = require("../../../data/repository/allocation/AllocationRepository");
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const GetAllocationService_1 = require("./GetAllocationService");
const makeGetAllocationService = () => {
    const allocationRepository = new AllocationRepository_1.PrismaAllocationRepository(PrismaClient_1.prismaClient.getClient());
    const getAllocationService = new GetAllocationService_1.GetAllocationService(allocationRepository);
    return { getAllocationService };
};
exports.makeGetAllocationService = makeGetAllocationService;
