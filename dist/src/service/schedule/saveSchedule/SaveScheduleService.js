"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveScheduleService = void 0;
class SaveScheduleService {
    constructor(_scheduleRepository, _validator) {
        this._scheduleRepository = _scheduleRepository;
        this._validator = _validator;
    }
    async handler(schedule) {
        // @ts-expect-error
        if (schedule.id) {
            return new Error('A schedule who already has an ID cannot be saved.');
        }
        const hasIncorrectValue = await this._validator.validate(schedule);
        if (hasIncorrectValue) {
            return hasIncorrectValue;
        }
        const hasSchedules = await this._scheduleRepository.getScheduleByUserId(schedule.userId);
        const hasSchedulesInSomeDate = hasSchedules.some(x => x.dateSchedule.getTime() === schedule.dateSchedule.getTime());
        if (hasSchedulesInSomeDate) {
            return new Error('User has schedule in some date.');
        }
        const result = this._scheduleRepository.insertSchedule(schedule);
        return result;
    }
}
exports.SaveScheduleService = SaveScheduleService;
