"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteConstructionService = void 0;
class DeleteConstructionService {
    constructor(_constructionRepository) {
        this._constructionRepository = _constructionRepository;
    }
    async handler(id) {
        if (!id) {
            return new Error('No id provided');
        }
        const constructionDeleted = await this._constructionRepository.deleteConstruction(id);
        return constructionDeleted;
    }
}
exports.DeleteConstructionService = DeleteConstructionService;
