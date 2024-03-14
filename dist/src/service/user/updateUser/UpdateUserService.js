"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserService = void 0;
const isValidCPF_1 = require("../../../utils/isValidCPF");
class UpdateUserService {
    constructor(_userRepository, _validator, _hasher) {
        this._userRepository = _userRepository;
        this._validator = _validator;
        this._hasher = _hasher;
    }
    async handler(user) {
        if (!user.id) {
            return new Error('A user who already no has an ID cannot be saved.');
        }
        if (!(0, isValidCPF_1.isValidCPF)(user.cpf)) {
            return new Error('CPF invalid provided.');
        }
        const hasIncorrectValue = await this._validator.validate(user);
        if (hasIncorrectValue) {
            return hasIncorrectValue;
        }
        const oldUser = await this._userRepository.getUser('email', user.email);
        if (user.password !== oldUser.password) {
            user.password = await this._hasher.hash(user.password);
        }
        const result = this._userRepository.updateUser(user);
        return result;
    }
}
exports.UpdateUserService = UpdateUserService;
