"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
const express_1 = __importDefault(require("express"));
const RequireLogin_1 = require("../../middleware/RequireLogin");
class HomeController {
    constructor() {
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get('/home', RequireLogin_1.requireLogin, this.handler.bind(this));
    }
    async handler(req, res) {
        // if (req.user) {
        //   res.status(200).redirect('/center')
        //   return
        // }
        res.status(200).render('./home.pug', {
            buttons: [{
                    link: '/user',
                    text: 'Gerenciar colaboradores'
                }, {
                    link: '/construction',
                    text: 'Gerenciar obras'
                }]
        });
    }
}
exports.HomeController = HomeController;
