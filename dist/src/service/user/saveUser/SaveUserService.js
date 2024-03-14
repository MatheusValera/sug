"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveUserService = void 0;
const isValidCPF_1 = require("../../../utils/isValidCPF");
class SaveUserService {
    constructor(_userRepository, _validator, _hasher) {
        this._userRepository = _userRepository;
        this._validator = _validator;
        this._hasher = _hasher;
    }
    async handler(user) {
        // @ts-expect-error
        if (user.id) {
            return new Error('A user who already has an ID cannot be saved.');
        }
        if (!(0, isValidCPF_1.isValidCPF)(user.cpf)) {
            return new Error('CPF invalid provided.');
        }
        const hasIncorrectValue = await this._validator.validate(user);
        if (hasIncorrectValue) {
            return hasIncorrectValue;
        }
        user.password = await this._hasher.hash(user.password);
        const result = this._userRepository.insertUser(user);
        return result;
    }
}
exports.SaveUserService = SaveUserService;
