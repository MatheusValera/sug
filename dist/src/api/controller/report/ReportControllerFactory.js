"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeReportController = void 0;
const ReportServiceFactory_1 = require("../../../service/report/ReportServiceFactory");
const ReportController_1 = require("./ReportController");
const makeReportController = () => {
    const reportService = (0, ReportServiceFactory_1.makeReportService)();
    return new ReportController_1.ReportController(reportService);
};
exports.makeReportController = makeReportController;
