"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserService = void 0;
const ISchedule_1 = require("../../../domain/data/entity/ISchedule");
const IGetAllocationService_1 = require("../../../domain/service/allocation/getAllocation/IGetAllocationService");
class DeleteUserService {
    constructor(_userRepository, _allocationService, _scheduleService) {
        this._userRepository = _userRepository;
        this._allocationService = _allocationService;
        this._scheduleService = _scheduleService;
    }
    async handler(id) {
        if (!id) {
            return new Error('No id provided');
        }
        const hasAllocations = await this._allocationService.getAllocationService.handler(id, IGetAllocationService_1.EOptions.BY_USER);
        const hasAllocationsActive = hasAllocations.some(allocation => allocation.status === ISchedule_1.EStatus.active);
        if (hasAllocationsActive) {
            return new Error('User has allocations active');
        }
        const hasSchedule = await this._scheduleService.getScheduleService.handler(id, IGetAllocationService_1.EOptions.BY_USER);
        const hasSchedulesActive = hasSchedule.some(schedule => schedule.status === ISchedule_1.EStatus.active);
        if (hasSchedulesActive) {
            return new Error('User has schedule active');
        }
        const userDeleted = await this._userRepository.deleteUser(id);
        return userDeleted;
    }
}
exports.DeleteUserService = DeleteUserService;
