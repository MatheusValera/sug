"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAllocationService = void 0;
class UpdateAllocationService {
    constructor(_allocationRepository, _validator) {
        this._allocationRepository = _allocationRepository;
        this._validator = _validator;
    }
    async handler(allocation) {
        if (!allocation.id) {
            return new Error('A allocation who already no has an ID cannot be saved.');
        }
        const hasIncorrectValue = await this._validator.validate(allocation);
        if (hasIncorrectValue) {
            return hasIncorrectValue;
        }
        const result = this._allocationRepository.updateAllocation(allocation);
        return result;
    }
}
exports.UpdateAllocationService = UpdateAllocationService;
