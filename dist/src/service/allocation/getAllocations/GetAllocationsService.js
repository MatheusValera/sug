"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllocationsService = void 0;
class GetAllocationsService {
    constructor(_allocationRepository) {
        this._allocationRepository = _allocationRepository;
    }
    async handler() {
        const allocations = await this._allocationRepository.getAllocations();
        return allocations;
    }
}
exports.GetAllocationsService = GetAllocationsService;
