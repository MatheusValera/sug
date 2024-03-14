"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSaveCompanyService = void 0;
const SaveCompanyService_1 = require("./SaveCompanyService");
const CompanyValidation_1 = require("../CompanyValidation");
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const CompanyRepository_1 = require("../../../data/repository/company/CompanyRepository");
const makeSaveCompanyService = () => {
    const validator = (0, CompanyValidation_1.makeCompanyValidation)();
    const repository = new CompanyRepository_1.PrismaCompanyRepository(PrismaClient_1.prismaClient.getClient());
    const saveCompanyService = new SaveCompanyService_1.SaveCompanyService(repository, validator);
    return { saveCompanyService };
};
exports.makeSaveCompanyService = makeSaveCompanyService;
