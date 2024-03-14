"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_1 = __importDefault(require("express"));
const IsAdmin_1 = require("../../middleware/IsAdmin");
const RequireLogin_1 = require("../../middleware/RequireLogin");
const SuccessResponse_1 = require("../../common/responses/SuccessResponse");
const InternalServerErrorResponse_1 = require("../../common/responses/InternalServerErrorResponse");
const BadRequestResponse_1 = require("../../common/responses/BadRequestResponse");
class UserController {
    constructor(_userService) {
        this._userService = _userService;
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get('/user', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.handler.bind(this));
        this.router.post('/user/getUser', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.getUser.bind(this));
        this.router.post('/user/saveUser', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.saveUser.bind(this));
        this.router.post('/user/updateUser', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.updateUser.bind(this));
        this.router.post('/user/deleteUser', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.deleteUser.bind(this));
    }
    async handler(request, response) {
        const users = await this._userService.getUsersService.handler();
        response.status(200).render('./user.pug', { users });
    }
    async getUser(req, res) {
        try {
            const key = req.body.key;
            const value = req.body.value;
            if (!key || !value) {
                return BadRequestResponse_1.BadRequestResponse.handler(res, 'No values provided.');
            }
            const user = await this._userService.getUserService.handler(key, value);
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(user));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
    async saveUser(req, res) {
        try {
            const userRaw = req.body;
            if (!userRaw) {
                return BadRequestResponse_1.BadRequestResponse.handler(res, 'No data provided.');
            }
            const user = await this._userService.saveUserService.handler(userRaw);
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(user));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
    async updateUser(req, res) {
        try {
            const userRaw = req.body;
            if (!userRaw) {
                return BadRequestResponse_1.BadRequestResponse.handler(res, 'No data provided.');
            }
            const user = await this._userService.updateUserService.handler(userRaw);
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(user));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
    async deleteUser(req, res) {
        try {
            const id = parseInt(req.body.id);
            if (!id) {
                return BadRequestResponse_1.BadRequestResponse.handler(res, 'No id provided.');
            }
            const user = await this._userService.deleteUserService.handler(id);
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(user));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
}
exports.UserController = UserController;
