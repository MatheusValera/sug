"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSaveAllocationService = void 0;
const AllocationRepository_1 = require("../../../data/repository/allocation/AllocationRepository");
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const AllocationValidation_1 = require("../AllocationValidation");
const SaveAllocationService_1 = require("./SaveAllocationService");
const makeSaveAllocationService = () => {
    const validator = (0, AllocationValidation_1.makeAllocationValidation)();
    const repository = new AllocationRepository_1.PrismaAllocationRepository(PrismaClient_1.prismaClient.getClient());
    const saveAllocationService = new SaveAllocationService_1.SaveAllocationService(repository, validator);
    return { saveAllocationService };
};
exports.makeSaveAllocationService = makeSaveAllocationService;
