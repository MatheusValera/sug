"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetScheduleService = void 0;
const IGetAllocationService_1 = require("../../../domain/service/allocation/getAllocation/IGetAllocationService");
class GetScheduleService {
    constructor(_scheduleRepository) {
        this._scheduleRepository = _scheduleRepository;
    }
    async handler(id, option) {
        if (!id) {
            return new Error('No id provided');
        }
        let schedule = null;
        if (option === IGetAllocationService_1.EOptions.BY_USER) {
            schedule = await this._scheduleRepository.getScheduleByUserId(id);
        }
        if (option === IGetAllocationService_1.EOptions.BY_ALLOCATION) {
            schedule = await this._scheduleRepository.getScheduleByAllocationId(id);
        }
        if (option === IGetAllocationService_1.EOptions.BY_CONSTRUCTION) {
            schedule = await this._scheduleRepository.getScheduleByConstructionId(id);
        }
        if (option === IGetAllocationService_1.EOptions.BY_SCHEDULE) {
            schedule = await this._scheduleRepository.getSchedule(id);
        }
        return schedule;
    }
}
exports.GetScheduleService = GetScheduleService;
