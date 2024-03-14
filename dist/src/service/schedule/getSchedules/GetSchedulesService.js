"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSchedulesService = void 0;
class GetSchedulesService {
    constructor(_scheduleRepository) {
        this._scheduleRepository = _scheduleRepository;
    }
    async handler() {
        const companies = await this._scheduleRepository.getSchedules();
        return companies;
    }
}
exports.GetSchedulesService = GetSchedulesService;
