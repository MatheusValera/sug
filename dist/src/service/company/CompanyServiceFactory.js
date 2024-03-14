"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCompanyService = void 0;
const GetCompanyServiceFactory_1 = require("./getCompany/GetCompanyServiceFactory");
const GetCompaniesServiceFactory_1 = require("./getCompanies/GetCompaniesServiceFactory");
const SaveCompanyServiceFactory_1 = require("./saveCompany/SaveCompanyServiceFactory");
const DeleteCompanyServiceFactory_1 = require("./deleteCompany/DeleteCompanyServiceFactory");
const UpdateCompanyServiceFactory_1 = require("./updateCompany/UpdateCompanyServiceFactory");
const makeCompanyService = () => {
    const getCompanyService = (0, GetCompanyServiceFactory_1.makeGetCompanyService)().getCompanyService;
    const saveCompanyService = (0, SaveCompanyServiceFactory_1.makeSaveCompanyService)().saveCompanyService;
    const updateCompanyService = (0, UpdateCompanyServiceFactory_1.makeUpdateCompanyService)().updateCompanyService;
    const deleteCompanyService = (0, DeleteCompanyServiceFactory_1.makeDeleteCompanyService)().deleteCompanyService;
    const getCompaniesService = (0, GetCompaniesServiceFactory_1.makeGetCompaniesService)().getCompaniesService;
    return {
        getCompanyService,
        saveCompanyService,
        updateCompanyService,
        deleteCompanyService,
        getCompaniesService
    };
};
exports.makeCompanyService = makeCompanyService;
