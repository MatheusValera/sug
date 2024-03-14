"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCompanyService = void 0;
class DeleteCompanyService {
    constructor(_companyRepository, _constructionRepository) {
        this._companyRepository = _companyRepository;
        this._constructionRepository = _constructionRepository;
    }
    async handler(id) {
        if (!id) {
            return new Error('No id provided');
        }
        const constructions = await this._constructionRepository.getConstructionsService.handler();
        const hasConstructionsActive = constructions.some(c => c.companyId === id && c.status === 'active');
        if (hasConstructionsActive) {
            return new Error('Possui construção ativa para essa companhia.');
        }
        const companyDeleted = await this._companyRepository.deleteCompany(id);
        return companyDeleted;
    }
}
exports.DeleteCompanyService = DeleteCompanyService;
