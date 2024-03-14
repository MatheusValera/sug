"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUserController = void 0;
const UserController_1 = require("./UserController");
const UserServiceFactory_1 = require("../../../service/user/UserServiceFactory");
const makeUserController = () => {
    const userService = (0, UserServiceFactory_1.makeUserService)();
    return new UserController_1.UserController(userService);
};
exports.makeUserController = makeUserController;
