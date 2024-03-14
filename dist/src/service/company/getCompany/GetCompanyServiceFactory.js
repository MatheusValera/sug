"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetCompanyService = void 0;
const GetCompanyService_1 = require("./GetCompanyService");
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const CompanyRepository_1 = require("../../../data/repository/company/CompanyRepository");
const makeGetCompanyService = () => {
    const companyRepository = new CompanyRepository_1.PrismaCompanyRepository(PrismaClient_1.prismaClient.getClient());
    const getCompanyService = new GetCompanyService_1.GetCompanyService(companyRepository);
    return { getCompanyService };
};
exports.makeGetCompanyService = makeGetCompanyService;
