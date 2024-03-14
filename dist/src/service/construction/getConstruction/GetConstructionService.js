"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConstructionService = void 0;
class GetConstructionService {
    constructor(_constructionRepository) {
        this._constructionRepository = _constructionRepository;
    }
    async handler(key, value) {
        if (!value) {
            return new Error('No value provided');
        }
        const construction = await this._constructionRepository.getConstruction(key, value);
        return construction;
    }
}
exports.GetConstructionService = GetConstructionService;
