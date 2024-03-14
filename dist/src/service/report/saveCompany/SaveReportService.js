"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveReportService = void 0;
class SaveReportService {
    constructor(_reportRepository, _validator) {
        this._reportRepository = _reportRepository;
        this._validator = _validator;
    }
    async handler(report) {
        // @ts-expect-error
        if (report.id) {
            return new Error('A report who already has an ID cannot be saved.');
        }
        const hasIncorrectValue = await this._validator.validate(report);
        if (hasIncorrectValue) {
            return hasIncorrectValue;
        }
        const result = this._reportRepository.insertReport(report);
        return result;
    }
}
exports.SaveReportService = SaveReportService;
