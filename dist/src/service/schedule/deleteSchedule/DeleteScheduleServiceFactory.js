"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteScheduleService = void 0;
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const DeleteScheduleService_1 = require("./DeleteScheduleService");
const SchedulesRepository_1 = require("../../../data/repository/schedules/SchedulesRepository");
const makeDeleteScheduleService = () => {
    const scheduleRepository = new SchedulesRepository_1.PrismaSchedulesRepository(PrismaClient_1.prismaClient.getClient());
    const deleteScheduleService = new DeleteScheduleService_1.DeleteScheduleService(scheduleRepository);
    return { deleteScheduleService };
};
exports.makeDeleteScheduleService = makeDeleteScheduleService;
