"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetReportService = void 0;
const IGetAllocationService_1 = require("../../../domain/service/allocation/getAllocation/IGetAllocationService");
class GetReportService {
    constructor(_reportRepository) {
        this._reportRepository = _reportRepository;
    }
    async handler(id, option) {
        if (!id) {
            return new Error('No id provided');
        }
        let report = null;
        if (option === IGetAllocationService_1.EOptions.BY_USER) {
            report = await this._reportRepository.getReportByUserId(id);
        }
        if (option === IGetAllocationService_1.EOptions.BY_SCHEDULE) {
            report = await this._reportRepository.getReportBySchedulesId(id);
        }
        if (option === IGetAllocationService_1.EOptions.BY_CONSTRUCTION) {
            report = await this._reportRepository.getReportByConstructionId(id);
        }
        if (option === IGetAllocationService_1.EOptions.BY_REPORT) {
            report = await this._reportRepository.getReport(id);
        }
        return report;
    }
}
exports.GetReportService = GetReportService;
