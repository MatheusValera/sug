"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleController = void 0;
const express_1 = __importDefault(require("express"));
const IsAdmin_1 = require("../../middleware/IsAdmin");
const RequireLogin_1 = require("../../middleware/RequireLogin");
const SuccessResponse_1 = require("../../common/responses/SuccessResponse");
const BadRequestResponse_1 = require("../../common/responses/BadRequestResponse");
const InternalServerErrorResponse_1 = require("../../common/responses/InternalServerErrorResponse");
class ScheduleController {
    constructor(_scheduleService, _usersService, _constructionService, _allocationService) {
        this._scheduleService = _scheduleService;
        this._usersService = _usersService;
        this._constructionService = _constructionService;
        this._allocationService = _allocationService;
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get('/schedule', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.handler.bind(this));
        this.router.post('/schedule/getSchedule', RequireLogin_1.requireLogin, this.getSchedule.bind(this));
        this.router.post('/schedule/getSchedules', RequireLogin_1.requireLogin, this.getSchedules.bind(this));
        this.router.post('/schedule/saveSchedule', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.saveSchedule.bind(this));
        this.router.post('/schedule/updateSchedule', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.updateSchedule.bind(this));
        this.router.post('/schedule/deleteSchedule', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.deleteSchedule.bind(this));
    }
    async handler(request, response) {
        const schedulesRaw = await this._scheduleService.getSchedulesService.handler();
        const users = await this._usersService.getUsersService.handler();
        const constructions = await this._constructionService.getConstructionsService.handler();
        const allocations = await this._allocationService.getAllocationsService.handler();
        const schedules = schedulesRaw.map(s => {
            const user = users.filter(u => u.id === s.userId)[0];
            const construction = constructions.filter(c => c.id === s.constructionId)[0];
            const allocation = allocations.filter(a => a.id === s.allocationId)[0];
            return {
                ...s,
                construction: {
                    name: construction.name
                },
                allocation: {
                    createdAt: allocation.createdAt
                },
                user: {
                    name: user.name
                }
            };
        });
        response.status(200).render('./schedule.pug', { schedules, users, constructions, allocations });
    }
    async getSchedule(req, res) {
        try {
            const id = parseInt(req.body.id);
            const option = req.body.option;
            if (!id) {
                return BadRequestResponse_1.BadRequestResponse.handler(res, 'No values provided.');
            }
            const schedule = await this._scheduleService.getScheduleService.handler(id, option);
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(schedule));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
    async getSchedules(req, res) {
        try {
            const schedule = await this._scheduleService.getSchedulesService.handler();
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(schedule));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
    async saveSchedule(req, res) {
        try {
            const scheduleRaw = req.body;
            if (!scheduleRaw) {
                return BadRequestResponse_1.BadRequestResponse.handler(res, 'No data provided.');
            }
            const schedule = await this._scheduleService.saveScheduleService.handler(scheduleRaw);
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(schedule));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
    async updateSchedule(req, res) {
        try {
            const scheduleRaw = req.body;
            if (!scheduleRaw) {
                return BadRequestResponse_1.BadRequestResponse.handler(res, 'No data provided.');
            }
            const schedule = await this._scheduleService.updateScheduleService.handler(scheduleRaw);
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(schedule));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
    async deleteSchedule(req, res) {
        try {
            const id = parseInt(req.body.id);
            if (!id) {
                return BadRequestResponse_1.BadRequestResponse.handler(res, 'No id provided.');
            }
            const schedule = await this._scheduleService.deleteScheduleService.handler(id);
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(schedule));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
}
exports.ScheduleController = ScheduleController;
