"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAllocationService = void 0;
class DeleteAllocationService {
    constructor(_allocationRepository) {
        this._allocationRepository = _allocationRepository;
    }
    async handler(id) {
        if (!id) {
            return new Error('No id provided');
        }
        const allocationDeleted = await this._allocationRepository.deleteAllocation(id);
        return allocationDeleted;
    }
}
exports.DeleteAllocationService = DeleteAllocationService;
