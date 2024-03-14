"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAllocationService = void 0;
const GetAllocationServiceFactory_1 = require("./getAllocation/GetAllocationServiceFactory");
const GetAllocationsServiceFactory_1 = require("./getAllocations/GetAllocationsServiceFactory");
const SaveAllocationServiceFactory_1 = require("./saveAllocation/SaveAllocationServiceFactory");
const DeleteAllocationServiceFactory_1 = require("./deleteAllocation/DeleteAllocationServiceFactory");
const UpdateAllocationServiceFactory_1 = require("./updateAllocation/UpdateAllocationServiceFactory");
const makeAllocationService = () => {
    const getAllocationService = (0, GetAllocationServiceFactory_1.makeGetAllocationService)().getAllocationService;
    const saveAllocationService = (0, SaveAllocationServiceFactory_1.makeSaveAllocationService)().saveAllocationService;
    const updateAllocationService = (0, UpdateAllocationServiceFactory_1.makeUpdateAllocationService)().updateAllocationService;
    const deleteAllocationService = (0, DeleteAllocationServiceFactory_1.makeDeleteAllocationService)().deleteAllocationService;
    const getAllocationsService = (0, GetAllocationsServiceFactory_1.makeGetAllocationsService)().getAllocationsService;
    return {
        getAllocationService,
        saveAllocationService,
        updateAllocationService,
        deleteAllocationService,
        getAllocationsService
    };
};
exports.makeAllocationService = makeAllocationService;
