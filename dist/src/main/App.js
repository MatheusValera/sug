"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const dotenv = __importStar(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const ErrorController_1 = require("../api/controller/error/ErrorController");
const UserRepository_1 = require("../data/repository/user/UserRepository");
const PrismaClient_1 = require("../infra/prisma/PrismaClient");
dotenv.config({ path: path_1.default.join(__dirname, '../../.env') });
class App {
    constructor(controllers) {
        this.app = (0, express_1.default)();
        this.port = parseInt(process.env.PORT, 10);
        this.setupExpress();
        this.setupMiddlewaresStart();
        this.setupPassport();
        this.setupControllers(controllers);
        this.setupMiddlewaresEnd();
    }
    setupControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use(controller.router);
        });
        this.app.use('/error-test', (req, res, next) => {
            throw new Error('to test error screen');
        });
        this.app.use(ErrorController_1.ErrorController.error404);
        this.app.use(ErrorController_1.ErrorController.error500);
    }
    setupExpress() {
        this.app.set('port', process.env.PORT);
        this.app.set('views', path_1.default.join(__dirname, '../presentation/views'));
        this.app.set('view engine', 'pug');
    }
    setupMiddlewaresStart() {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, express_session_1.default)({
            secret: process.env.SECRET_SESSION,
            resave: true,
            saveUninitialized: true,
            cookie: { secure: false }
        }));
        this.app.use((req, res, next) => {
            res.setHeader('x-powered-by', 'mix-universe');
            next();
        });
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '../presentation/')));
    }
    setupMiddlewaresEnd() {
        this.app.use((req, res, next) => {
            next();
        });
    }
    setupPassport() {
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
        passport_1.default.serializeUser((user, done) => {
            done(null, user.id);
        });
        passport_1.default.deserializeUser(async (_id, done) => {
            const userRepository = new UserRepository_1.PrismaUserRepository(PrismaClient_1.prismaClient.getClient());
            const { id, email, admin, name } = await userRepository.getUser('id', _id);
            if (id) {
                done(null, { id, email, admin, name });
                return;
            }
            done(null, false);
        });
    }
    async listen() {
        return new Promise((resolve) => {
            this.app.listen(this.port, () => {
                console.log(`\x1b[36m\nApp listening on the port ${this.port.toString()}\x1b[0m`);
                resolve();
            });
        });
    }
}
exports.App = App;
