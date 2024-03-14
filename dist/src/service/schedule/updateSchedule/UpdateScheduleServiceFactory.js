"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateScheduleService = void 0;
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const ScheduleValidation_1 = require("../ScheduleValidation");
const UpdateScheduleService_1 = require("./UpdateScheduleService");
const SchedulesRepository_1 = require("../../../data/repository/schedules/SchedulesRepository");
const makeUpdateScheduleService = () => {
    const validator = (0, ScheduleValidation_1.makeScheduleValidation)();
    const repository = new SchedulesRepository_1.PrismaSchedulesRepository(PrismaClient_1.prismaClient.getClient());
    const updateScheduleService = new UpdateScheduleService_1.UpdateScheduleService(repository, validator);
    return { updateScheduleService };
};
exports.makeUpdateScheduleService = makeUpdateScheduleService;
