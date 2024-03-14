"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCompanyController = void 0;
const CompanyServiceFactory_1 = require("../../../service/company/CompanyServiceFactory");
const CompanyController_1 = require("./CompanyController");
const makeCompanyController = () => {
    const companyService = (0, CompanyServiceFactory_1.makeCompanyService)();
    return new CompanyController_1.CompanyController(companyService);
};
exports.makeCompanyController = makeCompanyController;
