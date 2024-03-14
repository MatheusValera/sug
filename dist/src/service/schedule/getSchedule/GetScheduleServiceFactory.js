"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetScheduleService = void 0;
const GetScheduleService_1 = require("./GetScheduleService");
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const SchedulesRepository_1 = require("../../../data/repository/schedules/SchedulesRepository");
const makeGetScheduleService = () => {
    const scheduleRepository = new SchedulesRepository_1.PrismaSchedulesRepository(PrismaClient_1.prismaClient.getClient());
    const getScheduleService = new GetScheduleService_1.GetScheduleService(scheduleRepository);
    return { getScheduleService };
};
exports.makeGetScheduleService = makeGetScheduleService;
