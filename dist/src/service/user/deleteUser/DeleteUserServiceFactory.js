"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteUserService = void 0;
const DeleteUserService_1 = require("./DeleteUserService");
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const UserRepository_1 = require("../../../data/repository/user/UserRepository");
const AllocationServiceFactory_1 = require("../../allocation/AllocationServiceFactory");
const ScheduleServiceFactory_1 = require("../../schedule/ScheduleServiceFactory");
const makeDeleteUserService = () => {
    const userRepository = new UserRepository_1.PrismaUserRepository(PrismaClient_1.prismaClient.getClient());
    const allocationService = (0, AllocationServiceFactory_1.makeAllocationService)();
    const schedulesService = (0, ScheduleServiceFactory_1.makeScheduleService)();
    const deleteService = new DeleteUserService_1.DeleteUserService(userRepository, allocationService, schedulesService);
    return { deleteService };
};
exports.makeDeleteUserService = makeDeleteUserService;
