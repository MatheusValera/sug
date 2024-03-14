"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSaveReportService = void 0;
const ReportValidation_1 = require("../ReportValidation");
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const ReportRepository_1 = require("../../../data/repository/report/ReportRepository");
const SaveReportService_1 = require("./SaveReportService");
const makeSaveReportService = () => {
    const validator = (0, ReportValidation_1.makeReportValidation)();
    const repository = new ReportRepository_1.PrismaReportRepository(PrismaClient_1.prismaClient.getClient());
    const saveReportService = new SaveReportService_1.SaveReportService(repository, validator);
    return { saveReportService };
};
exports.makeSaveReportService = makeSaveReportService;
