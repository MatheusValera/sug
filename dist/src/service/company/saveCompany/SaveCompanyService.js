"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveCompanyService = void 0;
class SaveCompanyService {
    constructor(_companyRepository, _validator) {
        this._companyRepository = _companyRepository;
        this._validator = _validator;
    }
    async handler(company) {
        // @ts-expect-error
        if (company.id) {
            return new Error('A company who already has an ID cannot be saved.');
        }
        const hasIncorrectValue = await this._validator.validate(company);
        if (hasIncorrectValue) {
            return hasIncorrectValue;
        }
        company.createdAt = new Date();
        const result = this._companyRepository.insertCompany(company);
        return result;
    }
}
exports.SaveCompanyService = SaveCompanyService;
