"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstructionController = void 0;
const express_1 = __importDefault(require("express"));
const IsAdmin_1 = require("../../middleware/IsAdmin");
const RequireLogin_1 = require("../../middleware/RequireLogin");
const SuccessResponse_1 = require("../../common/responses/SuccessResponse");
const BadRequestResponse_1 = require("../../common/responses/BadRequestResponse");
const InternalServerErrorResponse_1 = require("../../common/responses/InternalServerErrorResponse");
class ConstructionController {
    constructor(_constructionService, _companyService) {
        this._constructionService = _constructionService;
        this._companyService = _companyService;
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get('/construction', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.handler.bind(this));
        this.router.post('/construction/getConstruction', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.getConstruction.bind(this));
        this.router.post('/construction/getConstructions', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.getConstructions.bind(this));
        this.router.post('/construction/saveConstruction', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.saveConstruction.bind(this));
        this.router.post('/construction/updateConstruction', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.updateConstruction.bind(this));
        this.router.post('/construction/deleteConstruction', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.deleteConstruction.bind(this));
    }
    async handler(request, response) {
        const constructionsRaw = await this._constructionService.getConstructionsService.handler();
        const companies = await this._companyService.getCompaniesService.handler();
        const constructions = constructionsRaw.map(c => {
            const company = companies.filter(company => company.id === c.companyId)[0];
            return {
                ...c,
                company: {
                    name: company === null || company === void 0 ? void 0 : company.nameCompany
                }
            };
        });
        response.status(200).render('./construction.pug', { constructions, companies });
    }
    async getConstruction(req, res) {
        try {
            const id = parseInt(req.body.id);
            if (!id) {
                return BadRequestResponse_1.BadRequestResponse.handler(res, 'No values provided.');
            }
            const construction = await this._constructionService.getConstructionService.handler('id', id);
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(construction));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
    async getConstructions(req, res) {
        try {
            const construction = await this._constructionService.getConstructionsService.handler();
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(construction));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
    async saveConstruction(req, res) {
        try {
            const constructionRaw = req.body;
            if (!constructionRaw) {
                return BadRequestResponse_1.BadRequestResponse.handler(res, 'No data provided.');
            }
            const construction = await this._constructionService.saveConstructionService.handler(constructionRaw);
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(construction));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
    async updateConstruction(req, res) {
        try {
            const constructionRaw = req.body;
            if (!constructionRaw) {
                return BadRequestResponse_1.BadRequestResponse.handler(res, 'No data provided.');
            }
            const construction = await this._constructionService.updateConstructionService.handler(constructionRaw);
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(construction));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
    async deleteConstruction(req, res) {
        try {
            const id = parseInt(req.body.id);
            if (!id) {
                return BadRequestResponse_1.BadRequestResponse.handler(res, 'No id provided.');
            }
            const construction = await this._constructionService.deleteConstructionService.handler(id);
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(construction));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
}
exports.ConstructionController = ConstructionController;
