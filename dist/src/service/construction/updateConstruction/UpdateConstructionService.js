"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConstructionService = void 0;
class UpdateConstructionService {
    constructor(_constructionRepository, _validator) {
        this._constructionRepository = _constructionRepository;
        this._validator = _validator;
    }
    async handler(construction) {
        if (!construction.id) {
            return new Error('A construction who already no has an ID cannot be saved.');
        }
        const hasIncorrectValue = await this._validator.validate(construction);
        if (hasIncorrectValue) {
            return hasIncorrectValue;
        }
        const result = this._constructionRepository.updateConstruction(construction);
        return result;
    }
}
exports.UpdateConstructionService = UpdateConstructionService;
