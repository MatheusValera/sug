"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserService = void 0;
class GetUserService {
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    async handler(key, value) {
        if (!key || !value) {
            return new Error('No id provided');
        }
        const user = await this._userRepository.getUser(key, value);
        return user;
    }
}
exports.GetUserService = GetUserService;
