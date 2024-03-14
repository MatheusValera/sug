"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteReportService = void 0;
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const DeleteReportService_1 = require("./DeleteReportService");
const ReportRepository_1 = require("../../../data/repository/report/ReportRepository");
const makeDeleteReportService = () => {
    const reportRepository = new ReportRepository_1.PrismaReportRepository(PrismaClient_1.prismaClient.getClient());
    const deleteReportService = new DeleteReportService_1.DeleteReportService(reportRepository);
    return { deleteReportService };
};
exports.makeDeleteReportService = makeDeleteReportService;
