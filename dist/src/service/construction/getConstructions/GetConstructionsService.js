"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConstructionsService = void 0;
class GetConstructionsService {
    constructor(_constructionRepository) {
        this._constructionRepository = _constructionRepository;
    }
    async handler() {
        const constructions = await this._constructionRepository.getConstructions();
        return constructions;
    }
}
exports.GetConstructionsService = GetConstructionsService;
