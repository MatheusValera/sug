"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAllocationController = void 0;
const AllocationServiceFactory_1 = require("../../../service/allocation/AllocationServiceFactory");
const ConstructionServiceFactory_1 = require("../../../service/construction/ConstructionServiceFactory");
const UserServiceFactory_1 = require("../../../service/user/UserServiceFactory");
const AllocationController_1 = require("./AllocationController");
const makeAllocationController = () => {
    const allocationService = (0, AllocationServiceFactory_1.makeAllocationService)();
    const userService = (0, UserServiceFactory_1.makeUserService)();
    const constructionService = (0, ConstructionServiceFactory_1.makeConstructionService)();
    return new AllocationController_1.AllocationController(allocationService, userService, constructionService);
};
exports.makeAllocationController = makeAllocationController;
