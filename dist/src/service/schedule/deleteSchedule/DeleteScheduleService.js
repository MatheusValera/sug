"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteScheduleService = void 0;
class DeleteScheduleService {
    constructor(_scheduleRepository) {
        this._scheduleRepository = _scheduleRepository;
    }
    async handler(id) {
        if (!id) {
            return new Error('No id provided');
        }
        const scheduleDeleted = await this._scheduleRepository.deleteSchedule(id);
        return scheduleDeleted;
    }
}
exports.DeleteScheduleService = DeleteScheduleService;
