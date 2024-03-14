"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCompanyService = void 0;
class GetCompanyService {
    constructor(_companyRepository) {
        this._companyRepository = _companyRepository;
    }
    async handler(id) {
        if (!id) {
            return new Error('No id provided');
        }
        const company = await this._companyRepository.getCompany(id);
        return company;
    }
}
exports.GetCompanyService = GetCompanyService;
