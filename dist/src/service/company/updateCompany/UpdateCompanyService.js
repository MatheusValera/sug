"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCompanyService = void 0;
class UpdateCompanyService {
    constructor(_companyRepository, _validator) {
        this._companyRepository = _companyRepository;
        this._validator = _validator;
    }
    async handler(company) {
        if (!company.id) {
            throw new Error('A company who already no has an ID cannot be saved.');
        }
        const hasIncorrectValue = await this._validator.validate(company);
        if (hasIncorrectValue) {
            return hasIncorrectValue;
        }
        company.updatedAt = new Date();
        const result = this._companyRepository.updateCompany(company);
        return result;
    }
}
exports.UpdateCompanyService = UpdateCompanyService;
