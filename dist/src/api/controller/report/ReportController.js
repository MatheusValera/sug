"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const express_1 = __importDefault(require("express"));
const IsAdmin_1 = require("../../middleware/IsAdmin");
const RequireLogin_1 = require("../../middleware/RequireLogin");
const SuccessResponse_1 = require("../../common/responses/SuccessResponse");
const BadRequestResponse_1 = require("../../common/responses/BadRequestResponse");
const InternalServerErrorResponse_1 = require("../../common/responses/InternalServerErrorResponse");
class ReportController {
    constructor(_reportService) {
        this._reportService = _reportService;
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get('/report', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.handler.bind(this));
        this.router.post('/report/getReport', RequireLogin_1.requireLogin, this.getReport.bind(this));
        this.router.post('/report/getReports', RequireLogin_1.requireLogin, this.getReports.bind(this));
        this.router.post('/report/saveReport', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.saveReport.bind(this));
        this.router.post('/report/updateReport', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.updateReport.bind(this));
        this.router.post('/report/deleteReport', RequireLogin_1.requireLogin, IsAdmin_1.isAdmin, this.deleteReport.bind(this));
    }
    async handler(request, response) {
        const reports = await this._reportService.getReportsService.handler();
        response.status(200).render('./report.pug', { reports });
    }
    async getReport(req, res) {
        try {
            const id = parseInt(req.body.id);
            const option = req.body.option;
            if (!id) {
                return BadRequestResponse_1.BadRequestResponse.handler(res, 'No values provided.');
            }
            const report = await this._reportService.getReportService.handler(id, option);
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(report));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
    async getReports(req, res) {
        try {
            const report = await this._reportService.getReportsService.handler();
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(report));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
    async saveReport(req, res) {
        try {
            const reportRaw = req.body;
            if (!reportRaw) {
                return BadRequestResponse_1.BadRequestResponse.handler(res, 'No data provided.');
            }
            const report = await this._reportService.saveReportService.handler(reportRaw);
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(report));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
    async updateReport(req, res) {
        try {
            const reportRaw = req.body;
            if (!reportRaw) {
                return BadRequestResponse_1.BadRequestResponse.handler(res, 'No data provided.');
            }
            const report = await this._reportService.updateReportService.handler(reportRaw);
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(report));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
    async deleteReport(req, res) {
        try {
            const id = parseInt(req.body.id);
            if (!id) {
                return BadRequestResponse_1.BadRequestResponse.handler(res, 'No id provided.');
            }
            const report = await this._reportService.deleteReportService.handler(id);
            return SuccessResponse_1.SuccessResponse.handler(res, JSON.stringify(report));
        }
        catch (error) {
            return InternalServerErrorResponse_1.InternalServerErrorResponse.handler(res, error.message);
        }
    }
}
exports.ReportController = ReportController;
