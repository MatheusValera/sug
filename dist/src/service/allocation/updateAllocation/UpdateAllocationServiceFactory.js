"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateAllocationService = void 0;
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const AllocationValidation_1 = require("../AllocationValidation");
const UpdateAllocationService_1 = require("./UpdateAllocationService");
const AllocationRepository_1 = require("../../../data/repository/allocation/AllocationRepository");
const makeUpdateAllocationService = () => {
    const validator = (0, AllocationValidation_1.makeAllocationValidation)();
    const repository = new AllocationRepository_1.PrismaAllocationRepository(PrismaClient_1.prismaClient.getClient());
    const updateAllocationService = new UpdateAllocationService_1.UpdateAllocationService(repository, validator);
    return { updateAllocationService };
};
exports.makeUpdateAllocationService = makeUpdateAllocationService;
