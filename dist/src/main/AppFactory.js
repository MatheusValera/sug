"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeApp = void 0;
const AllocationControllerFactory_1 = require("../api/controller/allocation/AllocationControllerFactory");
const CompanyControllerFactory_1 = require("../api/controller/company/CompanyControllerFactory");
const ConstructionControllerFactory_1 = require("../api/controller/construction/ConstructionControllerFactory");
const HomeControllerFactory_1 = require("../api/controller/home/HomeControllerFactory");
const LoginControllerFactory_1 = require("../api/controller/login/LoginControllerFactory");
const ScheduleControllerFactory_1 = require("../api/controller/schedule/ScheduleControllerFactory");
const userControllerFactory_1 = require("../api/controller/user/userControllerFactory");
const App_1 = require("./App");
const makeApp = () => {
    const userController = (0, userControllerFactory_1.makeUserController)();
    const homeController = (0, HomeControllerFactory_1.makeHomeController)();
    const loginController = (0, LoginControllerFactory_1.makeLoginController)();
    const companyController = (0, CompanyControllerFactory_1.makeCompanyController)();
    const constructionController = (0, ConstructionControllerFactory_1.makeConstructionController)();
    const allocationController = (0, AllocationControllerFactory_1.makeAllocationController)();
    const schedulesController = (0, ScheduleControllerFactory_1.makeScheduleController)();
    const app = new App_1.App([
        loginController,
        userController,
        homeController,
        companyController,
        constructionController,
        allocationController,
        schedulesController
    ]);
    return app;
};
exports.makeApp = makeApp;
