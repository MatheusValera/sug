"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateCompanyService = void 0;
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const CompanyValidation_1 = require("../CompanyValidation");
const UpdateCompanyService_1 = require("./UpdateCompanyService");
const CompanyRepository_1 = require("../../../data/repository/company/CompanyRepository");
const makeUpdateCompanyService = () => {
    const validator = (0, CompanyValidation_1.makeCompanyValidation)();
    const repository = new CompanyRepository_1.PrismaCompanyRepository(PrismaClient_1.prismaClient.getClient());
    const updateCompanyService = new UpdateCompanyService_1.UpdateCompanyService(repository, validator);
    return { updateCompanyService };
};
exports.makeUpdateCompanyService = makeUpdateCompanyService;
