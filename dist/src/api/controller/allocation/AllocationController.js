"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllocationController = void 0;
const express_1 = __importDefault(require("express"));
const IsAdmin_1 = require("../../middleware/IsAdmin");
const RequireLogin_1 = require("../../middleware/RequireLogin");
const SuccessResponse_1 = require("../../common/responses/SuccessResponse");
const BadRequestResponse_1 = require("../../common/responses/BadRequestResponse");
const InternalServerErrorResponse_1 = require("../../common/responses/InternalServerErrorResponse");
class AllocationController {
    constructor(_allocationService, _userService, _constructionService) {
        this._allocationService = _allocationService;
        this._userService = _userService;
        this._constructionService = _constructionService;
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get('/allocation', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.handler.bind(this));
        this.router.post('/allocation/getAllocation', RequireLogin_1.requireLogin, this.getAllocation.bind(this));
        this.router.post('/allocation/getAllocations', RequireLogin_1.requireLogin, this.getAllocations.bind(this));
        this.router.post('/allocation/saveAllocation', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.saveAllocation.bind(this));
        this.router.post('/allocation/updateAllocation', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.updateAllocation.bind(this));
        this.router.post('/allocation/deleteAllocation', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.deleteAllocation.bind(this));
    }
    async handler(request, response) {
        const users = await this._userService.getUsersService.handler();
        const constructions = await this._constructionService.getConstructionsService.handler();
        const allocationsRaw = await this._allocationService.getAllocationsService.handler();
        const allocations = allocationsRaw.map(a => {
            const user = users.filter(u => u.id === a.userId)[0];
            const construction = constructions.filter(c => c.id === a.constructionId)[0];
            return {
                ...a,
                user: {
                    name: user.name
                },
                construction: {
                    name: construction.name
                }
            };
        });
        response.status(200).render('./allocation.pug', { allocations, users, constructions });
    }
    async getAllocation(req, res) {
        try {
            const id = parseInt(req.body.id);
            const option = req.body.option;
            if (!id) {
                return BadRequestResponse_1.BadRequestResponse.handler(res, 'No values provided.');
            }
            const allocation = await this._allocationService.getAllocationService.handler(id, option);
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(allocation));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
    async getAllocations(req, res) {
        try {
            const allocation = await this._allocationService.getAllocationsService.handler();
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(allocation));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
    async saveAllocation(req, res) {
        try {
            const allocationRaw = req.body;
            if (!allocationRaw) {
                return BadRequestResponse_1.BadRequestResponse.handler(res, 'No data provided.');
            }
            const allocation = await this._allocationService.saveAllocationService.handler(allocationRaw);
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(allocation));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
    async updateAllocation(req, res) {
        try {
            const allocationRaw = req.body;
            if (!allocationRaw) {
                return BadRequestResponse_1.BadRequestResponse.handler(res, 'No data provided.');
            }
            const allocation = await this._allocationService.updateAllocationService.handler(allocationRaw);
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(allocation));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
    async deleteAllocation(req, res) {
        try {
            const id = parseInt(req.body.id);
            if (!id) {
                return BadRequestResponse_1.BadRequestResponse.handler(res, 'No id provided.');
            }
            const allocation = await this._allocationService.deleteAllocationService.handler(id);
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(allocation));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
}
exports.AllocationController = AllocationController;
