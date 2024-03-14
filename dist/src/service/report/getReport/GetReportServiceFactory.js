"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetReportService = void 0;
const GetReportService_1 = require("./GetReportService");
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const ReportRepository_1 = require("../../../data/repository/report/ReportRepository");
const makeGetReportService = () => {
    const reportRepository = new ReportRepository_1.PrismaReportRepository(PrismaClient_1.prismaClient.getClient());
    const getReportService = new GetReportService_1.GetReportService(reportRepository);
    return { getReportService };
};
exports.makeGetReportService = makeGetReportService;
