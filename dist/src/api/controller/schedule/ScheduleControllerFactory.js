"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeScheduleController = void 0;
const AllocationServiceFactory_1 = require("../../../service/allocation/AllocationServiceFactory");
const ConstructionServiceFactory_1 = require("../../../service/construction/ConstructionServiceFactory");
const ScheduleServiceFactory_1 = require("../../../service/schedule/ScheduleServiceFactory");
const UserServiceFactory_1 = require("../../../service/user/UserServiceFactory");
const ScheduleController_1 = require("./ScheduleController");
const makeScheduleController = () => {
    const scheduleService = (0, ScheduleServiceFactory_1.makeScheduleService)();
    const userService = (0, UserServiceFactory_1.makeUserService)();
    const constructionservice = (0, ConstructionServiceFactory_1.makeConstructionService)();
    const allocationService = (0, AllocationServiceFactory_1.makeAllocationService)();
    return new ScheduleController_1.ScheduleController(scheduleService, userService, constructionservice, allocationService);
};
exports.makeScheduleController = makeScheduleController;
