"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateReportService = void 0;
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const ReportValidation_1 = require("../ReportValidation");
const UpdateReportService_1 = require("./UpdateReportService");
const ReportRepository_1 = require("../../../data/repository/report/ReportRepository");
const makeUpdateReportService = () => {
    const validator = (0, ReportValidation_1.makeReportValidation)();
    const repository = new ReportRepository_1.PrismaReportRepository(PrismaClient_1.prismaClient.getClient());
    const updateReportService = new UpdateReportService_1.UpdateReportService(repository, validator);
    return { updateReportService };
};
exports.makeUpdateReportService = makeUpdateReportService;
