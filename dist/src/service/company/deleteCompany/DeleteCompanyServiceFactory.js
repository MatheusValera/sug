"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteCompanyService = void 0;
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const DeleteCompanyService_1 = require("./DeleteCompanyService");
const CompanyRepository_1 = require("../../../data/repository/company/CompanyRepository");
const ConstructionServiceFactory_1 = require("../../construction/ConstructionServiceFactory");
const makeDeleteCompanyService = () => {
    const companyRepository = new CompanyRepository_1.PrismaCompanyRepository(PrismaClient_1.prismaClient.getClient());
    const constructionService = (0, ConstructionServiceFactory_1.makeConstructionService)();
    const deleteCompanyService = new DeleteCompanyService_1.DeleteCompanyService(companyRepository, constructionService);
    return { deleteCompanyService };
};
exports.makeDeleteCompanyService = makeDeleteCompanyService;
