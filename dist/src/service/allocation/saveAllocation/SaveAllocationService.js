"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveAllocationService = void 0;
class SaveAllocationService {
    constructor(_allocationRepository, _validator) {
        this._allocationRepository = _allocationRepository;
        this._validator = _validator;
    }
    async handler(allocation) {
        // @ts-expect-error
        if (allocation.id) {
            return new Error('A allocation who already has an ID cannot be saved.');
        }
        const hasIncorrectValue = await this._validator.validate(allocation);
        if (hasIncorrectValue) {
            return hasIncorrectValue;
        }
        const result = this._allocationRepository.insertAllocation(allocation);
        return result;
    }
}
exports.SaveAllocationService = SaveAllocationService;
