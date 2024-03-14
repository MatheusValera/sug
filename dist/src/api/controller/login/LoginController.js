"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const BadRequestResponse_1 = require("../../common/responses/BadRequestResponse");
class LoginController {
    constructor(_login) {
        this._login = _login;
        this.router = express_1.default.Router();
        const localStrategy = new passport_local_1.default({
            usernameField: 'email',
            passReqToCallback: true
        }, this.authenticate.bind(this));
        passport_1.default.use('local', localStrategy);
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get('/login', this.handler.bind(this));
        this.router.post('/login', this.login.bind(this));
    }
    async handler(req, res) {
        if (req.user) {
            res.status(200).redirect('/home');
            return;
        }
        res.status(200).render('./login.pug', {});
    }
    async _refreshSession(req) {
        return new Promise((resolve) => {
            req.session.regenerate(resolve);
        });
    }
    async login(req, res, next) {
        var _a, _b, _c, _d;
        if (req.user) {
            res.redirect('/center');
            return;
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        const password = (_b = (_a = req.body.password) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : undefined;
        const email = (_d = (_c = req.body.email) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : undefined;
        if (!email || !password) {
            await BadRequestResponse_1.BadRequestResponse.handler(res, 'Invalid request');
            return;
        }
        passport_1.default.authenticate('local', null, async (err, user, info) => {
            if (err) {
                console.error(err);
                res.status(500).json({
                    success: false,
                    message: 'Um erro inesperado aconteceu. Tente novamente em alguns minutos.'
                });
                return;
            }
            if (!user) {
                res.status(401).json({
                    success: false,
                    message: info.msg
                });
                return;
            }
            await this._refreshSession(req);
            // @ts-expect-error
            req.logIn(user, () => {
                res.status(200).json({
                    success: true
                });
            });
        })(req, res, next);
    }
    async authenticate(req, email, password, callback) {
        const user = await this._login.handler(email, password);
        if (user instanceof Error) {
            callback(null, false, {
                msg: user.message
            });
            return;
        }
        await this._refreshSession(req);
        req.logIn(user, err => {
            callback(err, user);
        });
    }
}
exports.LoginController = LoginController;
