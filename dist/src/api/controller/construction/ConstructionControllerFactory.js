"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeConstructionController = void 0;
const CompanyServiceFactory_1 = require("../../../service/company/CompanyServiceFactory");
const ConstructionServiceFactory_1 = require("../../../service/construction/ConstructionServiceFactory");
const ConstructionController_1 = require("./ConstructionController");
const makeConstructionController = () => {
    const constructionService = (0, ConstructionServiceFactory_1.makeConstructionService)();
    const companyService = (0, CompanyServiceFactory_1.makeCompanyService)();
    return new ConstructionController_1.ConstructionController(constructionService, companyService);
};
exports.makeConstructionController = makeConstructionController;
