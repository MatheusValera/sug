"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConstructionService = void 0;
const GetConstructionServiceFactory_1 = require("./getConstruction/GetConstructionServiceFactory");
const GetConstructionServiceFactory_2 = require("./getConstructions/GetConstructionServiceFactory");
const SaveConstructionServiceFactory_1 = require("./saveConstruction/SaveConstructionServiceFactory");
const DeleteConstructionServiceFactory_1 = require("./deleteConstruction/DeleteConstructionServiceFactory");
const UpdateConstructionServiceFactory_1 = require("./updateConstruction/UpdateConstructionServiceFactory");
const makeConstructionService = () => {
    const getConstructionService = (0, GetConstructionServiceFactory_1.makeGetConstructionService)().getConstructionService;
    const saveConstructionService = (0, SaveConstructionServiceFactory_1.makeSaveConstructionService)().saveConstructionService;
    const updateConstructionService = (0, UpdateConstructionServiceFactory_1.makeUpdateConstructionService)().updateConstructionService;
    const deleteConstructionService = (0, DeleteConstructionServiceFactory_1.makeDeleteConstructionService)().deleteConstructionService;
    const getConstructionsService = (0, GetConstructionServiceFactory_2.makeGetConstructionsService)().getConstructionsService;
    return {
        getConstructionService,
        saveConstructionService,
        updateConstructionService,
        deleteConstructionService,
        getConstructionsService
    };
};
exports.makeConstructionService = makeConstructionService;
