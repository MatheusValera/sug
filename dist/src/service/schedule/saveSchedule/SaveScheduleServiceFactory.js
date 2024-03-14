"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSaveScheduleService = void 0;
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const SaveScheduleService_1 = require("./SaveScheduleService");
const ScheduleValidation_1 = require("../ScheduleValidation");
const SchedulesRepository_1 = require("../../../data/repository/schedules/SchedulesRepository");
const makeSaveScheduleService = () => {
    const validator = (0, ScheduleValidation_1.makeScheduleValidation)();
    const repository = new SchedulesRepository_1.PrismaSchedulesRepository(PrismaClient_1.prismaClient.getClient());
    const saveScheduleService = new SaveScheduleService_1.SaveScheduleService(repository, validator);
    return { saveScheduleService };
};
exports.makeSaveScheduleService = makeSaveScheduleService;
