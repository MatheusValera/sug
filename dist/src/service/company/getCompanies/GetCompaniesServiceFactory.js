"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetCompaniesService = void 0;
const GetCompaniesService_1 = require("./GetCompaniesService");
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const CompanyRepository_1 = require("../../../data/repository/company/CompanyRepository");
const makeGetCompaniesService = () => {
    const repository = new CompanyRepository_1.PrismaCompanyRepository(PrismaClient_1.prismaClient.getClient());
    const getCompaniesService = new GetCompaniesService_1.GetCompaniesService(repository);
    return { getCompaniesService };
};
exports.makeGetCompaniesService = makeGetCompaniesService;
