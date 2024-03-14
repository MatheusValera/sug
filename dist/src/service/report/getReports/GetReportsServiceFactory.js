"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetReportsService = void 0;
const GetReportsService_1 = require("./GetReportsService");
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const ReportRepository_1 = require("../../../data/repository/report/ReportRepository");
const makeGetReportsService = () => {
    const repository = new ReportRepository_1.PrismaReportRepository(PrismaClient_1.prismaClient.getClient());
    const getReportsService = new GetReportsService_1.GetReportsService(repository);
    return { getReportsService };
};
exports.makeGetReportsService = makeGetReportsService;
