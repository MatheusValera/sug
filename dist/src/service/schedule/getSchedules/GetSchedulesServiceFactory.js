"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetSchedulesService = void 0;
const GetSchedulesService_1 = require("./GetSchedulesService");
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const SchedulesRepository_1 = require("../../../data/repository/schedules/SchedulesRepository");
const makeGetSchedulesService = () => {
    const repository = new SchedulesRepository_1.PrismaSchedulesRepository(PrismaClient_1.prismaClient.getClient());
    const getSchedulesService = new GetSchedulesService_1.GetSchedulesService(repository);
    return { getSchedulesService };
};
exports.makeGetSchedulesService = makeGetSchedulesService;
