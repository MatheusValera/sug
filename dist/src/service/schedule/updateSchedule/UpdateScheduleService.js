"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateScheduleService = void 0;
class UpdateScheduleService {
    constructor(_scheduleRepository, _validator) {
        this._scheduleRepository = _scheduleRepository;
        this._validator = _validator;
    }
    async handler(schedule) {
        if (!schedule.id) {
            return new Error('A schedule who already no has an ID cannot be saved.');
        }
        const hasIncorrectValue = await this._validator.validate(schedule);
        if (hasIncorrectValue) {
            return hasIncorrectValue;
        }
        const result = this._scheduleRepository.updateSchedule(schedule);
        return result;
    }
}
exports.UpdateScheduleService = UpdateScheduleService;
