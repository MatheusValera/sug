"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaSchedulesRepository = void 0;
class PrismaSchedulesRepository {
    constructor(_prismaClient) {
        this._prismaClient = _prismaClient;
    }
    async insertSchedule(schedulesData) {
        const schedules = await this._prismaClient.schedule.create({
            data: schedulesData
        });
        return schedules;
    }
    async updateSchedule(schedulesToUpdate) {
        const { id, ...data } = schedulesToUpdate;
        const schedules = await this._prismaClient.schedule.update({
            data,
            where: { id }
        });
        return schedules;
    }
    async getSchedule(schedulesId) {
        return this._prismaClient.schedule.findUnique({
            where: { id: schedulesId }
        });
    }
    async getSchedules() {
        return this._prismaClient.schedule.findMany({});
    }
    async getScheduleByUserId(userId) {
        return this._prismaClient.schedule.findMany({
            where: { userId }
        });
    }
    async getScheduleByConstructionId(constructionId) {
        return this._prismaClient.schedule.findMany({
            where: { constructionId }
        });
    }
    async getScheduleByAllocationId(allocationId) {
        return this._prismaClient.schedule.findMany({
            where: { allocationId }
        });
    }
    async deleteSchedule(schedulesId) {
        const schedules = await this.getSchedule(schedulesId);
        if (!schedules) {
            throw new Error('[ENTITY - SCHEDULES]: Agendamento não encontrado');
        }
        await this._prismaClient.schedule.delete({
            where: { id: schedulesId }
        });
        return schedules;
    }
}
exports.PrismaSchedulesRepository = PrismaSchedulesRepository;
