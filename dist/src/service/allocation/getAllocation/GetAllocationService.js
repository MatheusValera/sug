"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllocationService = void 0;
const IGetAllocationService_1 = require("../../../domain/service/allocation/getAllocation/IGetAllocationService");
class GetAllocationService {
    constructor(_allocationRepository) {
        this._allocationRepository = _allocationRepository;
    }
    async handler(id, option) {
        if (!id) {
            return new Error('No id provided');
        }
        let allocation = null;
        if (option === IGetAllocationService_1.EOptions.BY_USER) {
            allocation = await this._allocationRepository.getAllocationByUserId(id);
        }
        if (option === IGetAllocationService_1.EOptions.BY_ALLOCATION) {
            allocation = await this._allocationRepository.getAllocation(id);
        }
        if (option === IGetAllocationService_1.EOptions.BY_CONSTRUCTION) {
            allocation = await this._allocationRepository.getAllocationByConstructionId(id);
        }
        return allocation;
    }
}
exports.GetAllocationService = GetAllocationService;
