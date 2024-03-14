"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
class LoginService {
    constructor(_hasher, _userRepository) {
        this._hasher = _hasher;
        this._userRepository = _userRepository;
    }
    async handler(email, password) {
        if (!email || !password) {
            return new Error('Email or password not provided');
        }
        const user = await this._userRepository.getUser('email', email);
        if (!user) {
            return new Error(`The email address ${email} is not associated with any account. `);
        }
        const isMatch = await this._hasher.compare(password, user.password);
        return isMatch ? user : new Error('Incorrect password');
    }
}
exports.LoginService = LoginService;
