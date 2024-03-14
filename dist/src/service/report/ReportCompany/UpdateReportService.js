"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReportService = void 0;
class UpdateReportService {
    constructor(_reportRepository, _validator) {
        this._reportRepository = _reportRepository;
        this._validator = _validator;
    }
    async handler(report) {
        if (!report.id) {
            return new Error('A report who already no has an ID cannot be saved.');
        }
        const hasIncorrectValue = await this._validator.validate(report);
        if (hasIncorrectValue) {
            return hasIncorrectValue;
        }
        const result = this._reportRepository.updateReport(report);
        return result;
    }
}
exports.UpdateReportService = UpdateReportService;
