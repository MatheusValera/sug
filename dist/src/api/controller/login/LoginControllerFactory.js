"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoginController = void 0;
const LoginController_1 = require("./LoginController");
const LoginServiceFactory_1 = require("../../../service/login/LoginServiceFactory");
const makeLoginController = () => {
    const loginService = (0, LoginServiceFactory_1.makeLoginService)();
    return new LoginController_1.LoginController(loginService.loginService);
};
exports.makeLoginController = makeLoginController;
