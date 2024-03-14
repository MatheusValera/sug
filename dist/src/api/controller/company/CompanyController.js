"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const express_1 = __importDefault(require("express"));
const IsAdmin_1 = require("../../middleware/IsAdmin");
const RequireLogin_1 = require("../../middleware/RequireLogin");
const SuccessResponse_1 = require("../../common/responses/SuccessResponse");
const BadRequestResponse_1 = require("../../common/responses/BadRequestResponse");
const InternalServerErrorResponse_1 = require("../../common/responses/InternalServerErrorResponse");
class CompanyController {
    constructor(_companyService) {
        this._companyService = _companyService;
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get('/company', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.handler.bind(this));
        this.router.post('/company/getCompany', RequireLogin_1.requireLogin, this.getCompany.bind(this));
        this.router.post('/company/getCompanies', RequireLogin_1.requireLogin, this.getCompanies.bind(this));
        this.router.post('/company/saveCompany', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.saveCompany.bind(this));
        this.router.post('/company/updateCompany', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.updateCompany.bind(this));
        this.router.post('/company/deleteCompany', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.deleteCompany.bind(this));
    }
    async handler(request, response) {
        const companies = await this._companyService.getCompaniesService.handler();
        response.status(200).render('./company.pug', { companies });
    }
    async getCompany(req, res) {
        try {
            const id = parseInt(req.body.id);
            if (!id) {
                return BadRequestResponse_1.BadRequestResponse.handler(res, 'No values provided.');
            }
            const company = await this._companyService.getCompanyService.handler(id);
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(company));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
    async getCompanies(req, res) {
        try {
            const company = await this._companyService.getCompaniesService.handler();
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(company));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
    async saveCompany(req, res) {
        try {
            const companyRaw = req.body;
            if (!companyRaw) {
                return BadRequestResponse_1.BadRequestResponse.handler(res, 'No data provided.');
            }
            const company = await this._companyService.saveCompanyService.handler(companyRaw);
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(company));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
    async updateCompany(req, res) {
        try {
            const companyRaw = req.body;
            if (!companyRaw) {
                return BadRequestResponse_1.BadRequestResponse.handler(res, 'No data provided.');
            }
            const company = await this._companyService.updateCompanyService.handler(companyRaw);
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(company));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
    async deleteCompany(req, res) {
        try {
            const id = parseInt(req.body.id);
            if (!id) {
                return BadRequestResponse_1.BadRequestResponse.handler(res, 'No id provided.');
            }
            const company = await this._companyService.deleteCompanyService.handler(id);
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(company));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
}
exports.CompanyController = CompanyController;
