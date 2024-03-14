"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveConstructionService = void 0;
class SaveConstructionService {
    constructor(_constructionRepository, _validator) {
        this._constructionRepository = _constructionRepository;
        this._validator = _validator;
    }
    async handler(construction) {
        // @ts-expect-error
        if (construction.id) {
            return new Error('A construction who already has an ID cannot be saved.');
        }
        const hasIncorrectValue = await this._validator.validate(construction);
        if (hasIncorrectValue) {
            return hasIncorrectValue;
        }
        const result = this._constructionRepository.insertConstruction(construction);
        return result;
    }
}
exports.SaveConstructionService = SaveConstructionService;
