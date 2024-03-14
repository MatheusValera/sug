"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeScheduleService = void 0;
const GetScheduleServiceFactory_1 = require("./getSchedule/GetScheduleServiceFactory");
const GetSchedulesServiceFactory_1 = require("./getSchedules/GetSchedulesServiceFactory");
const DeleteScheduleServiceFactory_1 = require("./deleteSchedule/DeleteScheduleServiceFactory");
const SaveScheduleServiceFactory_1 = require("./saveSchedule/SaveScheduleServiceFactory");
const UpdateScheduleServiceFactory_1 = require("./updateSchedule/UpdateScheduleServiceFactory");
const makeScheduleService = () => {
    const getScheduleService = (0, GetScheduleServiceFactory_1.makeGetScheduleService)().getScheduleService;
    const saveScheduleService = (0, SaveScheduleServiceFactory_1.makeSaveScheduleService)().saveScheduleService;
    const updateScheduleService = (0, UpdateScheduleServiceFactory_1.makeUpdateScheduleService)().updateScheduleService;
    const deleteScheduleService = (0, DeleteScheduleServiceFactory_1.makeDeleteScheduleService)().deleteScheduleService;
    const getSchedulesService = (0, GetSchedulesServiceFactory_1.makeGetSchedulesService)().getSchedulesService;
    return {
        getScheduleService,
        saveScheduleService,
        updateScheduleService,
        deleteScheduleService,
        getSchedulesService
    };
};
exports.makeScheduleService = makeScheduleService;
