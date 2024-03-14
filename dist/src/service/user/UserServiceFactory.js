"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUserService = void 0;
const GetUserServiceFactory_1 = require("./getUser/GetUserServiceFactory");
const SaveUserServiceFactory_1 = require("./saveUser/SaveUserServiceFactory");
const UpdateUserServiceFactory_1 = require("./updateUser/UpdateUserServiceFactory");
const DeleteUserServiceFactory_1 = require("./deleteUser/DeleteUserServiceFactory");
const GetUserServiceFactory_2 = require("./getUsers/GetUserServiceFactory");
const makeUserService = () => {
    const getUserService = (0, GetUserServiceFactory_1.makeGetUserService)().getUserService;
    const saveUserService = (0, SaveUserServiceFactory_1.makeSaveUserService)().saveUserService;
    const updateUserService = (0, UpdateUserServiceFactory_1.makeUpdateUserService)().updateUserService;
    const deleteUserService = (0, DeleteUserServiceFactory_1.makeDeleteUserService)().deleteService;
    const getUsersService = (0, GetUserServiceFactory_2.makeGetUsersService)().getUsersService;
    return {
        getUserService,
        saveUserService,
        updateUserService,
        deleteUserService,
        getUsersService
    };
};
exports.makeUserService = makeUserService;
