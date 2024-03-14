"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteAllocationService = void 0;
const AllocationRepository_1 = require("../../../data/repository/allocation/AllocationRepository");
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const DeleteAllocationService_1 = require("./DeleteAllocationService");
const makeDeleteAllocationService = () => {
    const allocationRepository = new AllocationRepository_1.PrismaAllocationRepository(PrismaClient_1.prismaClient.getClient());
    const deleteAllocationService = new DeleteAllocationService_1.DeleteAllocationService(allocationRepository);
    return { deleteAllocationService };
};
exports.makeDeleteAllocationService = makeDeleteAllocationService;
