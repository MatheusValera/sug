"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsersService = void 0;
class GetUsersService {
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    async handler() {
        const users = await this._userRepository.getUsers();
        return users;
    }
}
exports.GetUsersService = GetUsersService;
