"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetReportsService = void 0;
class GetReportsService {
    constructor(_reportRepository) {
        this._reportRepository = _reportRepository;
    }
    async handler() {
        const companies = await this._reportRepository.getReports();
        return companies;
    }
}
exports.GetReportsService = GetReportsService;
