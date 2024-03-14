"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCompaniesService = void 0;
class GetCompaniesService {
    constructor(_companyRepository) {
        this._companyRepository = _companyRepository;
    }
    async handler() {
        const companies = await this._companyRepository.getCompanies();
        return companies;
    }
}
exports.GetCompaniesService = GetCompaniesService;
