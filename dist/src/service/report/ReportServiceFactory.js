"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeReportService = void 0;
const GetReportServiceFactory_1 = require("./getReport/GetReportServiceFactory");
const GetReportsServiceFactory_1 = require("./getReports/GetReportsServiceFactory");
const DeleteReportServiceFactory_1 = require("./deleteReport/DeleteReportServiceFactory");
const SaveReportServiceFactory_1 = require("./saveCompany/SaveReportServiceFactory");
const UpdateReportServiceFactory_1 = require("./ReportCompany/UpdateReportServiceFactory");
const makeReportService = () => {
    const getReportService = (0, GetReportServiceFactory_1.makeGetReportService)().getReportService;
    const saveReportService = (0, SaveReportServiceFactory_1.makeSaveReportService)().saveReportService;
    const updateReportService = (0, UpdateReportServiceFactory_1.makeUpdateReportService)().updateReportService;
    const deleteReportService = (0, DeleteReportServiceFactory_1.makeDeleteReportService)().deleteReportService;
    const getReportsService = (0, GetReportsServiceFactory_1.makeGetReportsService)().getReportsService;
    return {
        getReportService,
        saveReportService,
        updateReportService,
        deleteReportService,
        getReportsService
    };
};
exports.makeReportService = makeReportService;
