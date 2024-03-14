"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteReportService = void 0;
class DeleteReportService {
    constructor(_reportRepository) {
        this._reportRepository = _reportRepository;
    }
    async handler(id) {
        if (!id) {
            return new Error('No id provided');
        }
        const reportDeleted = await this._reportRepository.deleteReport(id);
        return reportDeleted;
    }
}
exports.DeleteReportService = DeleteReportService;
