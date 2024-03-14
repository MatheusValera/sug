"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUserService = void 0;
const GetPermissionsServiceFactory_1 = require("./getPermissions/GetPermissionsServiceFactory");
const makeUserService = () => {
    const getPermissionsService = (0, GetPermissionsServiceFactory_1.makeGetPermissionsService)().getPermissionsService;
    return {
        getPermissionsService
    };
};
exports.makeUserService = makeUserService;
