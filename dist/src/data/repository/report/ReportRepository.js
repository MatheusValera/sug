"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaReportRepository = void 0;
class PrismaReportRepository {
    constructor(_prismaClient) {
        this._prismaClient = _prismaClient;
    }
    async insertReport(reportData) {
        const report = await this._prismaClient.report.create({
            data: reportData
        });
        return report;
    }
    async updateReport(reportToUpdate) {
        const { id, ...data } = reportToUpdate;
        const report = await this._prismaClient.report.update({
            data,
            where: { id }
        });
        return report;
    }
    async getReport(reportId) {
        return this._prismaClient.report.findUnique({
            where: { id: reportId }
        });
    }
    async getReports() {
        return this._prismaClient.report.findMany({});
    }
    async getReportByUserId(userId) {
        return this._prismaClient.report.findMany({
            where: { userId }
        });
    }
    async getReportBySchedulesId(scheduleId) {
        return this._prismaClient.report.findMany({
            where: { scheduleId }
        });
    }
    async getReportByConstructionId(constructionId) {
        return this._prismaClient.report.findMany({
            where: { constructionId }
        });
    }
    async deleteReport(reportId) {
        const report = await this.getReport(reportId);
        if (!report) {
            throw new Error('[ENTITY - REPORT]: Relatório não encontrado');
        }
        await this._prismaClient.report.delete({
            where: { id: reportId }
        });
        return report;
    }
}
exports.PrismaReportRepository = PrismaReportRepository;
